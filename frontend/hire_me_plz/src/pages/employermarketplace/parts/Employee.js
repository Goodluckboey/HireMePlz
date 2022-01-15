import React from "react";

const Employee = ({ username, firstname, lastname }) => {
  return (
    <div>
      <img src="" alt="myImage" />
      <div>{username}</div>
      <div>{firstname}</div>
      <div>{lastname}</div>
    </div>
  );
};

export default Employee;
