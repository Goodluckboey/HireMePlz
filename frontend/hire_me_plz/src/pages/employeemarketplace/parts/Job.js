import React from "react";

const Job = ({name, description, reward, status}) => {
  return (
    <div>
      <img src="" alt="myImage" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
    </div>
  );
};

export default Job;
