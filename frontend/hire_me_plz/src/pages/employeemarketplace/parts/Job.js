import React from "react";

const Job = ({name, description, reward, status}) => {
  return (
    <div>
      <img src="" alt="myImage" />
      <div>{name}</div>
      <div>{description}</div>
      <div>{reward}</div>
      <div>{status}</div>
      <button>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default Job;
