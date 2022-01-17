import React from "react";
import Button from "../../../generalcomponent/Button";
import styles from "./modules/card.module.css";

const Job = ({ name, description, reward, status, applyJob, imageUrl }) => {
  const imgStyle = { width: "100px", height: "100px", objectFit: "cover" };
  return (
    <div className={styles.card}>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{name}</h3>
        <h3 className={styles.cardReward}>For {reward} coins</h3>
        <h3 className={styles.cardDescription}>{description}</h3>
        {status === "Open" && (
          <h5>
            {" "}
            <span class="badge rounded-pill bg-light text-dark">{status}</span>
          </h5>
        )}
        {status === "accepted" && (
          <h5>
            <span class="badge rounded-pill bg-success text-dark ">
              {status}
            </span>
          </h5>
        )}
      </div>
      {/* <button onClick={applyJob} type="button" class="btn btn-success">
        Apply
      </button> */}
    </div>
  );
};

export default Job;
