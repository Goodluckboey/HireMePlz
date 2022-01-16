import React from "react";
import noImage from "../images/noimage.png";

const AppliedJob = ({ name, description, reward, status, imageUrl }) => {
  return (
    <div>
      <img src={imageUrl ? imageUrl : noImage} alt="applied-image" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
    </div>
  );
};

export default AppliedJob;
