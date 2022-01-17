import React from "react";
import noImage from "../images/noimage.png";
import styles from "./modules/card.module.css";

const AppliedJob = ({ name, description, reward, status, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="appliedImage" />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{name}</h3>
        <h3 className={styles.cardDescription}>{description}</h3>
        <h3 className={styles.cardReward}>{reward}</h3>
        <h5>
          <span class="badge rounded-pill bg-success text-dark ">{status}</span>
        </h5>
      </div>
    </div>
  );
};

export default AppliedJob;
