import React from "react";

const Employee = ({ username, firstname, lastname, imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="myImage" />
      <div>{username}</div>
      <div>{firstname}</div>
      <div>{lastname}</div>
    </div>
  );
};

export default Employee;
