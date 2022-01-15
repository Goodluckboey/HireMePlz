import React from "react";
import Button from "../../../generalcomponent/Button";

const Job = ({ name, description, reward, status, onClick }) => {
  return (
    <div>
      <img src="" alt="myImage" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
      <Button onClick={onClick} value="Apply"></Button>
    </div>
  );
};

export default Job;
