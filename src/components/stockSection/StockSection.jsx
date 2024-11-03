import React, { useEffect, useState } from "react";
import ListBox from "../list/ListBox";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./StockSection.module.css";

const StockSection = () => {
 
  return (
    <div className={styles.dataBox}>
      <div className={styles.box}>
        {/* {userData &&
          userData.kitaplar?.map((item) => (
            <ListBox
              key={item.kitabadiId}
              item={item}
              updateCount={updateCount}
            />
          ))} */}
      </div>
    </div>
  );
};

export default StockSection;
