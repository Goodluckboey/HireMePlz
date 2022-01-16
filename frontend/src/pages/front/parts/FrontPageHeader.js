import React, { useContext } from "react";
import LinksForHeader from "./LinksForHeader";
import styles from "./modules/header.module.css";
import Useridcontext from "../../../context/userid-context";

const FrontPageHeader = () => {
  const callUserId = useContext(Useridcontext);
  const userId = callUserId.userId;
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
          {userId === "" && (
            <li className={styles.links}>
              <LinksForHeader link={"/login"} name="Login"></LinksForHeader>
            </li>
          )}
          {userId === "" && (
            <li className={styles.links}>
              <LinksForHeader
                link={"/registration"}
                name="Sign Up!"
              ></LinksForHeader>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FrontPageHeader;
