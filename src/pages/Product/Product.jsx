import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAddTodoMutation } from '../../redux/slices/todoApiSlice';
import styles from '../addTodo/AddNewTodo.module.css';

const Product = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photo, setPhoto] = useState(null); // New state for photo
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addTodo] = useAddTodoMutation();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      if (photo) formData.append('photo', photo);

      const newTodo = await addTodo(formData).unwrap();

      setTimeout(() => {
        dispatch({ type: 'todo/addTodo', payload: newTodo });
      }, 1000);

      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add the todo:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New TODO</h2>
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            onChange={handlePhotoChange}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>Add TODO</button>
          <button type="button" onClick={() => navigate('/dashboard')} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Product;
