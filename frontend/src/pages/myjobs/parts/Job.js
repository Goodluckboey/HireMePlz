import React from "react";
import Button from "../../../generalcomponent/Button";
import styles from "../../employeemarketplace/parts/modules/ee.module.css";

const Job = ({ name, description, reward, status, applyJob, imageUrl }) => {
  const imgStyle = { width: "100px", height: "100px", objectFit: "cover" };
  return (
    <div>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardInfo}>
        <h1 className={styles.cardName}>{name}</h1>
        <h2 className={styles.cardReward}>For {reward} coins</h2>
        <h3 className={styles.cardDescription}>{description}</h3>
        <span class="badge rounded-pill bg-light text-dark">{status}</span>
      </div>
      {/* <button onClick={applyJob} type="button" class="btn btn-success">
        Apply
      </button> */}
    </div>
  );
};

export default Job;
