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
      <FrontPageHeader></FrontPageHeader>
      <div className={styles.banner}>
        <img id={styles.bannerImage} src={"/images/pngItem_2949029.jpg"}></img>
        <div id={styles.titleText}>
          <h1>Be a part of a thriving community of adventurous people!</h1>
          <p>Sign Up today for a free trial</p>
        </div>
        {/* <form>
          <input
            id={styles.searchbar}
            type="text"
            placeholder={`Try entering "fixer"..`}
            size="80"
          ></input>
        </form> */}
      </div>
      <div id={styles.whyChooseUs}>
        <h1>Why Choose Us?</h1>
        <div id={styles.iconsBox}>
          <div className="iconContainer">
            <i class="fas fa-arrows-alt fa-7x"></i>
            <p>Text for Icon</p>
          </div>
          <div className="iconContainer">
            <i class="fas fa-bed fa-7x"></i>
            <p>Text for Icon</p>
          </div>
          <div className="iconContainer">
            <i class="fas fa-bicycle fa-7x"></i>
            <p>Text for Icon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
