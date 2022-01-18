import React from "react";
import noImage from "../images/noimage.png";
import styles from "./modules/card.module.css";
import Button from "../../../generalcomponent/Button";
import axios from "axios";

const AppliedJob = ({
  name,
  description,
  reward,
  status,
  imageUrl,
  _id,
  setFetchAppliedJobs,
  userId,
}) => {
  const refreshData = () => {
    axios.get(`http://127.0.0.1:5000/appliedjobs/${userId}`).then((res) => {
      setFetchAppliedJobs(res.data);
    });
  };

  const handleUnapply = (element) => {
    axios.put(`http://127.0.0.1:5000/appliedjob/cancel/${element}`).then(() => {
      refreshData();
    });
  };
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
      <div>
        <Button
          onClick={() => handleUnapply(_id)}
          value="Cancel Application"
        ></Button>
      </div>
    </div>
  );
};

export default AppliedJob;
