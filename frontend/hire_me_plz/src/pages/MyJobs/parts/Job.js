import React from "react";
import noImage from "../images/noimage.png";

const Job = ({name, description, reward, status}) => {
  return (
    <div>
      <img src={noImage} alt="myImage" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
    </div>
  );
};

export default Job;
