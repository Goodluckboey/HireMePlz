import React from "react";
import { Link } from "react-router-dom";

const AfterLoggedInHeader = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>Logo</div>
      <Link to="/">Logout</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/myjobs">My Jobs</Link>
    </div>
  );
};

export default AfterLoggedInHeader;
