import React from "react";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div>
      <h3>
        You are not logged in! Please login <Link to="/login">here</Link>
      </h3>
    </div>
  );
};

export default NotLoggedIn;
