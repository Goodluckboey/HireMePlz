import React from "react";
import Button from "../../../generalcomponent/Button";
import styles from "./modules/card.module.css";

const Job = ({ name, description, reward, status, applyJob, imageUrl }) => {
  const imgStyle = { width: "100px", height: "100px", objectFit: "cover" };

  return (
    <div>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.ctrlBadge}>
          {status === "Open" && (
            <h5>
              <span class="badge rounded-pill bg-light text-dark">
                {status}
              </span>
            </h5>
          )}
          {status === "accepted" && (
            <h5>
              <span class="badge rounded-pill bg-success text-dark ">
                {status}
              </span>
            </h5>
          )}
          <p className={styles.cardName}>{name}</p>
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <h4 className={styles.cardReward}>GC {reward} </h4>
      </div>
    </div>
  );
};

export default Job;
