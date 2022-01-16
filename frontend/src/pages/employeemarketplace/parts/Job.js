import React from "react";
import Button from "../../../generalcomponent/Button";

const Job = ({ name, description, reward, status, applyJob }) => {
  return (
    <div>
      <img src="" alt="myImage" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
      <Button onClick={applyJob} value="Apply"></Button>
    </div>
  );
};

export default Job;
