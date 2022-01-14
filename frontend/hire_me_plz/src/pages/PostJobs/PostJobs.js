import axios from "axios";
import React, { useState } from "react";

const PostJobs = () => {
  const employerid = "";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");

  const handlePostJob = async () => {
    const body = {
      name,
      description,
      reward,
      employerid,
    };
    const endpoint = `http://localhost:5000/postjobs`;
    const res = await axios.post(endpoint, body);
  };

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
      <button onClick={handlePostJob}>Add New Job</button>
    </div>
  );
};

export default PostJobs;
