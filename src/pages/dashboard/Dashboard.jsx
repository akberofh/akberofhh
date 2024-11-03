import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { removeTodo, setTodos, updateTodo as updateTodoAction } from '../../redux/slices/todoSlice';
import { useGetTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation } from '../../redux/slices/todoApiSlice';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editPhoto, setEditPhoto] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (data) {
      dispatch(setTodos(data));
    }
  }, [navigate, userInfo, data, dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap();
      dispatch(removeTodo(id));
    } catch (err) {
      console.error('Failed to delete the todo:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo._id);
    setEditTitle(todo.title);
    setEditBody(todo.body);
    setEditPhoto(todo.photo);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPhoto(file); // Keep the File object instead of converting to base64
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('_id', editingTodo);
      formData.append('title', editTitle);
      formData.append('body', editBody);
      if (editPhoto) {
        formData.append('photo', editPhoto);
      }

      

      const updatedTodo = await updateTodo(formData).unwrap();
      dispatch(updateTodoAction(updatedTodo));

      console.log([...formData]);



      toast.success("Todo updated successfully");
      setEditingTodo(null);
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/profile')} className={styles.profileButton}>Profilə Keç</button>
        <button onClick={() => navigate('/add-new-todo')} className={styles.addButton}>Yeni Məhsul Əlavə Et</button>
      </div>
      <div className={styles.todoList}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading todos</p>}
        {data && data.map(item => (
          <div key={item._id} className={styles.todoItem}>
            {editingTodo === item._id ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  className={styles.input}
                />
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  placeholder="Body"
                  className={styles.textarea}
                />
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  className={styles.fileInput}
                />
                {editPhoto && <img src={`data:image/jpeg;base64,${editPhoto}`} alt="Preview" className={styles.photoPreview} />}
                <button onClick={handleUpdate} className={styles.saveButton}>Yenilə</button>
                <button onClick={() => setEditingTodo(null)} className={styles.cancelButton}>Çıx</button>
              </div>
            ) : (
              <>
                <img src={`data:image/jpeg;base64,${item.photo}`} alt="Todo" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <button onClick={() => handleEdit(item)} className={styles.editButton}>Düzənlə</button>
                <button onClick={() => handleDelete(item._id)} className={styles.deleteButton}>Sil</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
