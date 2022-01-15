import React from "react";
import { Link } from "react-router-dom";

const AfterLoggedInHeader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/">
        <div>Logo</div>
      </Link>
      <Link to="/profile">Profile</Link>
      <Link to="/myjobs">My Jobs</Link>
      <Link to="/">Logout</Link>
    </div>
  );
};

export default AfterLoggedInHeader;
