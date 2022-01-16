import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <div>
      <h1>You are not logged in! Please login <Link to="/login">here</Link></h1>
    </div>
  );
};

export default NotLoggedIn;