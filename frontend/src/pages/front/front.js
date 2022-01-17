import React, { useState, useContext } from "react";
import FrontPageHeader from "./parts/FrontPageHeader";
import styles from "./parts/modules/header.module.css";
import axios from "axios";
import Job from "../employeemarketplace/parts/Job";
import { v4 as uuidv4 } from "uuid";
import Useridcontext from "../../context/userid-context";

const FrontPage = () => {
  const callAndSetUserId = useContext(Useridcontext);

  return (
    <div id="FrontPage">
      <FrontPageHeader></FrontPageHeader>
      <div className={styles.banner}>
        <img id={styles.bannerImage} src={"/images/pngItem_2949029.jpg"}></img>
        <h1 id={styles.titleText}>
          Be part of the Job search <br />
          with a helpful community!
        </h1>
        <form>
          <input
            id={styles.searchbar}
            type="text"
            placeholder={`Try entering "fixer"..`}
            size="80"
            // onChange={(e) => {
            //   setJobQuery(e.target.value);
            // }}
            // onClick={pullJobData()}
          ></input>
        </form>
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
