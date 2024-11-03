import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { useLoginMutation } from "../../redux/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigation('/dashboard');
    }
  }, [navigation, userInfo]);

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigation('/dashboard');
    } catch (error) {
      toast.error('Sehv email ya sifre')
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.auth}>
        <h1>Giriş</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="Şifrə"
            name="Şifrə"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <div className={styles.error}>{loginError}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Giriş edilir...' : 'Giriş'}
          </button>
        </form>
        <p className={styles.loginmessage} onClick={() => navigation('/register')}>
          <span>Qeydiyyat</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
