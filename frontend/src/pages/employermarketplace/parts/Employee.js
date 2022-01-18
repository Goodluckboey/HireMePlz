import React from "react";
import styles from "./modules/er.module.css";

const Employee = ({ username, firstname, lastname, imageUrl, tags }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardText}>
        <div className={styles.cardInfo}>
          <h1 className={styles.username}>{username}</h1>
          <h2 className={styles.firstname}>{firstname}</h2>
          <h3 className={styles.lastname}>{lastname}</h3>
        </div>
        <ul className={styles.ul}>
          {tags.map((element) => {
            return (
              <li>
                <h4 className={styles.li}>{element}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Employee;
