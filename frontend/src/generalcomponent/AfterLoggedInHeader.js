import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Useridcontext from "../context/userid-context";

const AfterLoggedInHeader = () => {
  //Call the setUserId state from app
  const callSetUserId = useContext(Useridcontext);
  const setUserId = callSetUserId.setUserId;
  //Reset state to blank upon logout
  const handleLogout = () => {
    setUserId("");
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/">
        <div>Logo</div>
      </Link>
      <Link to="/profile">Profile</Link>
      <Link to="/myjobs">My Jobs</Link>
      <Link to="/">
        <Button onClick={handleLogout} value="Logout"></Button>
      </Link>
    </div>
  );
};

export default AfterLoggedInHeader;
