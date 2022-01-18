import React from "react";
import styles from "./modules/er.module.css";

const Employee = ({ username, firstname, lastname, imageUrl, tags }) => {
  const produceBadge = () => {
    const badgeArray = [
      <span class="badge bg-warning text-dark">Gold</span>,
      <span class="badge bg-info text-dark">Silver</span>,
      <span class="badge bg-dark text-dark">Iron</span>,
    ];

    const ranNum = Math.round(Math.random() * 2);

    return badgeArray[ranNum];
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardText}>
        <div className={styles.cardInfo}>
          <div className={styles.ctrlBadge}>
            {produceBadge()}
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
                <p className={styles.li}>{element}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Employee;
