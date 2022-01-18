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
          <h3 className={styles.username}>{username}</h3>
          <h5 className={styles.firstname}>{firstname}</h5>
          <h5 className={styles.lastname}>{lastname}</h5>
        </div>
        <ul className={styles.ul}>
          {tags.map((element) => {
            return (
              <li>
                <h5 className={styles.li}>{element}</h5>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Employee;
