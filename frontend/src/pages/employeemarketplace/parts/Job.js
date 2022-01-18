import React, { useContext } from "react";
import Useridcontext from "../../../context/userid-context";
import styles from "./modules/ee.module.css";

const Job = ({ name, description, reward, status, applyJob, imageUrl }) => {
  // context
  const { userId } = useContext(Useridcontext);

  return (
    <div>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.ctrlBadge}>
          <span class="badge rounded-pill bg-light text-dark">{status}</span>
          <p className={styles.cardName}>{name}</p>
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <h4 className={styles.cardReward}>GC {reward} </h4>
      </div>
      {userId && (
        <button onClick={applyJob} type="button" class="btn btn-success">
          Apply
        </button>
      )}
    </div>
  );
};

export default Job;
