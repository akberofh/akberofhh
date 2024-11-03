import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../../redux/slices/authSlice";
import { useLogoutMutation, useUpdateUserMutation } from "../../redux/slices/usersApiSlice";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setphoto] = useState(""); // State for profile photo

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword('');
        setConfirmPassword('');
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.data.message || error.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setphoto(userInfo.photo); // Set the profile photo from user info
    }
  }, [userInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.headBox}>
        <button onClick={() => navigate("/dashboard")}>Geri</button>
        <button onClick={handleLogout}>Çıxış</button>
      </div>
      <div className={styles.main}>
        <div className={styles.proContainer}>
          <h1>Profil</h1>
          {photo && ( // Render the profile photo if it exists
            <img 
              src={`data:image/jpeg;base64,${photo}`} 
              alt="Profile" 
              className={styles.photo} // You may need to style this class
            />
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Ad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Şifrə</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Şifrəni yeniden gir</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {isLoading ? "Dəyşikliklər göndərilir..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
