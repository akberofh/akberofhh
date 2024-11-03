import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidUser} from "react-icons/bi";

const Header = () => {

  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  useEffect(()=>{
    if(!userInfo){
      navigation('/login')
    }
  },[navigation, userInfo])

  return (
    <div className={styles.container}>
      <h1>{userInfo?.name}</h1>
      <div>
        <button onClick={() => navigation('/profile')} className={styles.userBtn}><BiSolidUser size={20}/></button>
      </div>
    </div>
  );
};

export default Header;
