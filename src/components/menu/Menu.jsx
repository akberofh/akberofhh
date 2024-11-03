import React, { useEffect } from "react";
import styles from "./Menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import { logout } from "../../redux/slices/authSlice";

const Menu = () => {

  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigation('/login')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!userInfo){
      navigation('/login')
    }
  },[navigation, userInfo])

  return (
    <div className={styles.container}>
      <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        <button>Stok</button>
        <button>Dergi</button>
      </div>
      <div>
        <button className={styles.exitBtn} onClick={handleLogout}>Çıkış yap</button>
      </div>
    </div>
  );
};

export default Menu;
