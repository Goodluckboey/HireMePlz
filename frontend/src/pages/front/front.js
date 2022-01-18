import React, { useState, useContext } from "react";
import FrontPageHeader from "./parts/FrontPageHeader";
import styles from "./parts/modules/header.module.css";
// import axios from "axios";
// import Job from "../employeemarketplace/parts/Job";
// import { v4 as uuidv4 } from "uuid";
// import Useridcontext from "../../context/userid-context";

const FrontPage = () => {
  // const callAndSetUserId = useContext(Useridcontext);

  return (
    <div id="FrontPage">
      <div className={styles.banner}>
        <img id={styles.bannerImage} src={"/images/pngItem_2949029.jpg"}></img>
        <div id={styles.titleText}>
          <h1>
            Be a part of a thriving community
            <br />
            of over 70,000 adventurous people!
          </h1>
          <p className={styles.smallText}>Sign Up today for a free trial.</p>
          <img
            id={styles.pngImg}
            src={
              "/images/kisspng-singapore-skyline-korea-landmark-5b054903e2c9c7.8967877815270730279289.png"
            }
          ></img>
        </div>
      </div>
      <div className={styles.trustedBy}>
        <h1 className={styles.trustedByText}>Trusted by:</h1>
        <div className={styles.iconGroup}>
          <i class="fab fa-facebook-square fa-3x"></i>
          <i class="fab fa-google fa-3x"></i>
          <i class="fab fa-android fa-3x"></i>
          <i class="fab fa-cc-amex fa-3x"></i>
          <i class="fab fa-twitter-square fa-3x"></i>
        </div>
      </div>

      <div id={styles.whyChooseUs}>
        <h1>Why Choose Us?</h1>
        <div id={styles.iconsBox}>
          <div className="iconContainer">
            <i class="fas fa-arrows-alt fa-7x"></i>
            <p className={styles.text}>
              With our reach wider than ever, <br />
              the number of jobs available have been <br />
              steadily increasing.
            </p>
          </div>
          <div className="iconContainer">
            <i class="fas fa-bed fa-7x"></i>
            <p className={styles.text} p>
              Who says you need to wake up early? <br />
              Select jobs that suit you Night Owls!
            </p>
          </div>
          <div className="iconContainer">
            <i class="fas fa-bicycle fa-7x"></i>
            <p className={styles.text}>
              The number of Courier type jobs
              <br /> are immense, which means for those bikers out there,
              <br /> get great exercise, and get paid at the same time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
