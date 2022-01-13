import React, { useState } from "react";

const PostJobs = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  return (
    <div>
      <h1>New Job Post</h1>
      <input
        placeholder="Job Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        placeholder="Job Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <input
        placeholder="Reward"
        value={reward}
        onChange={(e) => {
          setReward(e.target.value);
        }}
      ></input>
      <button>Add New Job</button>
    </div>
  );
};

export default PostJobs;
