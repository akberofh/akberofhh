import React, { useState } from "react";
import styles from "./ListBox.module.css";

const ListBox = ({ item, updateCount }) => {
  const [count, setCount] = useState("");

  const handleInputChange = (e) => {
    setCount(e.target.value);
  };

  const handleClick = () => {
    if (count.trim() !== "") {
      updateCount(item.kitabadiId, parseInt(count));
      setCount("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <span style={{ fontSize: "20px" }}>{item.kitap_adi}</span>
        <div style={{ display: "flex", alignItems: "center", width: "7%", justifyContent: "space-between" }}>
          <span>Stok:</span>
          <span style={{ fontSize: "20px" }}>{item.adet}</span>
        </div>
      </div>
      <div className={styles.rightSide}>
        <input
          type="text"
          value={count}
          onChange={handleInputChange}
          placeholder="Miktar gir"
        />
        <button onClick={handleClick}>Stock Update</button>
      </div>
    </div>
  );
};

export default ListBox;
