import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Useridcontext from "../../context/userid-context";
import styles from "../modules/aftloghead.module.css";

const AfterLoggedInHeader = () => {
  // scroll handlers
  const [scrolly, setScrolly] = useState(0);
  const scrollHandler = () => {
    setScrolly(window.scrollY);
  };
  useEffect(() => {
    return;
  }, [scrolly]);

  window.addEventListener("scroll", scrollHandler);

  // useContext: userid and switchmode (false = employee)
  const { userId, setUserId, switchMode, setSwitchMode } =
    useContext(Useridcontext);

  // reset userid state after logout
  const handleLogout = () => {
    setUserId("");
  };

  // switch between employee and employer mode
  const handleSwitchMode = () => {
    setSwitchMode(!switchMode);
  };

  // dynamic inline-style
  const buttonStyle = { borderRadius: "30px" };
  const toggleButtonStyle = { ...buttonStyle, width: "170px" };
  const linkStyle = { margin: "0 30px 0 0" };

  // components
  const marketplaceLink = (
    <Link
      style={linkStyle}
      className="link text-dark"
      to={switchMode ? "/employermarketplace" : "/employeemarketplace"}
    >
      Marketplace
    </Link>
  );

  const logoutButton = (
    <Link to="/">
      <button
        style={buttonStyle}
        className="btn btn-dark"
        onClick={handleLogout}
      >
        Logout
      </button>
    </Link>
  );

  const loginButton = (
    <Link to="/login">
      <button type="button" className="btn btn-light" style={buttonStyle}>
        Login
      </button>
    </Link>
  );

  const signupButton = (
    <Link to="/registration">
      <button
        id={styles.signup}
        type="button"
        className="btn btn-primary"
        data-mdb-ripple-color="dark"
        style={buttonStyle}
      >
        sign up
      </button>
    </Link>
  );

  const profileLink = (
    <Link style={linkStyle} className="text-dark" to="/profile">
      Profile
    </Link>
  );
  const myjobsLink = (
    <Link style={linkStyle} className="text-dark" to="/myjobs">
      My Jobs
    </Link>
  );

  const switchModeToggle = (
    <div className="form-check form-switch">
      <button
        style={toggleButtonStyle}
        type="button"
        className={switchMode ? "btn btn-danger" : "btn btn-success"}
        data-mdb-toggle="button"
        onClick={handleSwitchMode}
      >
        {switchMode ? "employer mode" : "employee mode"}
      </button>
    </div>
  );

  return (
    <>
      <div id={scrolly === 0 ? styles.headerTop : styles.headerMove}>
        <Link to="/">
          <img
            id={styles.logo}
            src={
              "https://scontent.fsin5-1.fna.fbcdn.net/v/t39.30808-6/271245768_10228523490291485_6192991775366027449_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=XtWPaU2HkJAAX-cB7yl&_nc_ht=scontent.fsin5-1.fna&oh=00_AT8RTeGbBcwxlZLskO84KYuk2pTigLHYMqAnGMJYhjpEuw&oe=61E9C1CB"
            }
          ></img>
        </Link>
        <div className={styles.itemsgrp}>
          <div className={styles.linksgrp}>
            {marketplaceLink}
            {userId && profileLink}
            {userId && myjobsLink}
          </div>
          {switchModeToggle}
          {!userId && loginButton}
          {!userId && signupButton}
          {userId && logoutButton}
        </div>
      </div>
    </>
  );
};

export default AfterLoggedInHeader;
