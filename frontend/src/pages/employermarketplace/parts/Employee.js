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
          <div className={styles.ctrlBadge}>
            <span class="badge rounded-pill bg-warning text-dark">Bronze</span>
            <p className={styles.username}>{username}</p>
          </div>
          <h5 className={styles.Names}>
            {firstname} {lastname}
          </h5>
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
