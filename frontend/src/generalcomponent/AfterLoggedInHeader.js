import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Useridcontext from "../context/userid-context";
import styles from "./modules/aftloghead.module.css";

const AfterLoggedInHeader = () => {
  //Call the setUserId state from app
  const callSetUserId = useContext(Useridcontext);
  const setUserId = callSetUserId.setUserId;
  //Reset state to blank upon logout
  const handleLogout = () => {
    setUserId("");
  };
  return (
    <div className={styles.logHeader}>
      <Link to="/">
        <img
          id={styles.logo}
          src={
            "https://scontent.fsin5-1.fna.fbcdn.net/v/t39.30808-6/271245768_10228523490291485_6192991775366027449_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=XtWPaU2HkJAAX-cB7yl&_nc_ht=scontent.fsin5-1.fna&oh=00_AT8RTeGbBcwxlZLskO84KYuk2pTigLHYMqAnGMJYhjpEuw&oe=61E9C1CB"
          }
        ></img>
      </Link>
      <div className={styles.linksgrp}>
        <Link to="/profile" class="text-dark">
          Profile
        </Link>
        <Link to="/myjobs" class="text-dark">
          My Jobs
        </Link>
      </div>
      <Link to="/">
        <button id={styles.logout} class="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
      </Link>
    </div>
  );
};

export default AfterLoggedInHeader;
