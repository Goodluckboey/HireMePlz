import React from "react";
import LinksForHeader from "./LinksForHeader";
import styles from "./modules/header.module.css";

const FrontPageHeader = () => {
  return (
    <div className={styles.NavigationBar}>
      <div id={styles.allLinks}>
        <ul className={styles.header}>
          <li className={styles.links}>
            <LinksForHeader link={"/"} name="About"></LinksForHeader>
          </li>
          <li className={styles.links}>
            <LinksForHeader link={"/"} name="Contact Us"></LinksForHeader>
          </li>
          <li className={styles.links}>
            <LinksForHeader link={"/login"} name="Login"></LinksForHeader>
          </li>
        </ul>
        <a href="/" id={styles.signUpButton}>
          Sign Up!
        </a>
      </div>
    </div>
  );
};

export default FrontPageHeader;
