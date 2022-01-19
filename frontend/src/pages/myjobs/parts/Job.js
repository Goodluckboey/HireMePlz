import React from "react";
import Button from "../../../generalcomponent/Button";
import styles from "./modules/card.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Job = ({
  name,
  description,
  reward,
  status,
  imageUrl,
  setFetchedJobs,
  _id,
  employerid,
}) => {
  const imgStyle = { width: "100px", height: "100px", objectFit: "cover" };

  const refreshData = () => {
    axios.get(`http://127.0.0.1:5000/myjobs/${employerid}`).then((res) => {
      setFetchedJobs(res.data);
    });
  };

  const handleAccept = (element) => {
    axios
      .put(`http://127.0.0.1:5000/individualjob/accept/${element}`)
      .then(() => {
        refreshData();
      });
  };

  const handleReject = (element) => {
    axios
      .put(`http://127.0.0.1:5000/individualjob/reject/${element}`)
      .then(() => {
        refreshData();
      });
  };

  const handleComplete = (element) => {
    axios
      .put(`http://127.0.0.1:5000/individualjob/completed/${element}`)
      .then(() => {
        refreshData();
      });
  };
  const displayStatus = () => {
    if (status === "Open" || status === "Pending") {
      return (
        <h5>
          <span class="badge rounded-pill bg-light text-dark">{status}</span>
        </h5>
      );
    } else if (status === "Accepted") {
      return (
        <h5>
          <span class="badge rounded-pill bg-success text-dark ">{status}</span>
        </h5>
      );
    }
  };

  const displayButton = () => {
    if (status === "Pending") {
      return (
        <>
          <div>
            <Button
              onClick={() => handleAccept(_id)}
              value="Accept Applicant"
            ></Button>
          </div>
          <div>
            <Button
              onClick={() => handleReject(_id)}
              value="Reject Applicant"
            ></Button>
          </div>
        </>
      );
    } else if (status === "Accepted") {
      return (
        <>
          <div>
            <Button
              onClick={() => handleComplete(_id)}
              value="Job Completed"
            ></Button>
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImgBox}>
        <img src={imageUrl} className={styles.cardImg} alt="myImage" />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.ctrlBadge}>
          {displayStatus()}
          <p className={styles.cardName}>{name}</p>
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <h4 className={styles.cardReward}>GC {reward} </h4>
      </div>
      {/* {displayButton()} */}
      {status === "Pending" && (
        <>
          <div>
            <Button
              onClick={() => handleAccept(_id)}
              value="Accept Applicant"
            ></Button>
          </div>
          <div>
            <Button
              onClick={() => handleReject(_id)}
              value="Reject Applicant"
            ></Button>
          </div>
        </>
      )}
      {status === "Accepted" && (
        <>
          <div>
            <Button
              onClick={() => handleComplete(_id)}
              value="Job Completed"
            ></Button>
          </div>
        </>
      )}
      <Link to={`/editjob/${_id}`}>Edit Quest</Link>
    </div>
  );
};

export default Job;
