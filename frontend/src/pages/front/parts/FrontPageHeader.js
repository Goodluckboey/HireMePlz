import React, { useContext, useState } from "react";
import LinksForHeader from "./LinksForHeader";
import styles from "./modules/header.module.css";
import { Link } from "react-router-dom";
import Useridcontext from "../../../context/userid-context";

const FrontPageHeader = () => {
  const callUserId = useContext(Useridcontext);
  const userId = callUserId.userId;
  const setUserId = callUserId.setUserId;

  const [logState, setLogState] = useState(false);
  let visibillityTracker = styles.links;

  const handleLogout = () => {
    setUserId("");
  };

  if (userId !== "") {
    visibillityTracker = styles.transparent;
  }

  return (
    <div className={styles.NavigationBar}>
      <Link to="/">
        <img
          id={styles.logo}
          src={
            "https://scontent.fsin5-1.fna.fbcdn.net/v/t39.30808-6/271245768_10228523490291485_6192991775366027449_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=XtWPaU2HkJAAX-cB7yl&_nc_ht=scontent.fsin5-1.fna&oh=00_AT8RTeGbBcwxlZLskO84KYuk2pTigLHYMqAnGMJYhjpEuw&oe=61E9C1CB"
          }
        ></img>
      </Link>
      <div id={styles.allLinks}>
        <ul className={styles.header}>
          <li className={styles.links} id={styles.findjobs}>
            <LinksForHeader
              link={"/employeemarketplace"}
              name="Find Jobs"
            ></LinksForHeader>
          </li>

          {userId === "" && (
            <li className={visibillityTracker}>
              <Link to="/login">
                <button id={styles.signin} type="button" class="btn btn-light">
                  Login
                </button>
              </Link>
            </li>
          )}
          {userId === "" && (
            <li className={visibillityTracker}>
              <Link to="/registration">
                <button
                  id={styles.signup}
                  type="button"
                  class="btn btn-primary"
                  data-mdb-ripple-color="dark"
                >
                  sign up
                </button>
              </Link>
            </li>
          )}
          {userId !== "" && (
            <li className={styles.links}>
              <Link to="/">
                <button
                  id={styles.logout}
                  class="btn btn-dark"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FrontPageHeader;
