import React from "react";
import LinksForHeader from "./LinksForHeader";
import styles from "./modules/header.module.css";

const FrontPageHeader = () => {
  return (
    <div className={styles.NavigationBar}>
      <div id={styles.allLinks}>
        <ul className={styles.header}>
          <li className={styles.links}>
            <LinksForHeader
              link={"/employeemarketplace"}
              name="Find Jobs"
            ></LinksForHeader>
          </li>
          <li className={styles.links}>
            <LinksForHeader link={"/login"} name="Login"></LinksForHeader>
          </li>
          <li className={styles.links}>
            <LinksForHeader
              link={"/registration"}
              name="Sign Up!"
            ></LinksForHeader>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FrontPageHeader;
