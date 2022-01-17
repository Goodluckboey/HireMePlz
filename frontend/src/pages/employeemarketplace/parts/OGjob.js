import React from "react";
import Button from "../../../generalcomponent/Button";

const Job = ({ name, description, reward, status, applyJob, imageUrl }) => {
  const imgStyle = { width: "100px", height: "100px", objectFit: "cover" };
  return (
    <div>
      <img src={imageUrl} style={imgStyle} alt="myImage" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
      <Button onClick={applyJob} value="Apply"></Button>
    </div>
  );
};

export default Job;
