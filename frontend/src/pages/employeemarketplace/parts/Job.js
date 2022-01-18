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
        <h1 className={styles.cardName}>{name}</h1>
        <h2 className={styles.cardReward}>For {reward} coins</h2>
        <h3 className={styles.cardDescription}>{description}</h3>
        <span class="badge rounded-pill bg-light text-dark">{status}</span>
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
