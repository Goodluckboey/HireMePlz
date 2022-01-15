import React, { useState } from "react";
import axios from "axios";

const editjob = () => {
  // job id
  const jobid = "";

  // states for input fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [reward, setReward] = useState("");

  // function for onClick to update job on database
  const handleSave = async (e) => {
    e.preventDefault();
    const editedJob = {
      name: jobTitle,
      description: jobDescription,
      reward,
    };
    const endpoint = `http://127.0.0.1:5000/editjob/${jobid}`;
    try {
      const res = await axios.put(endpoint, editedJob);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <input
          placeholder="job title"
          value={jobTitle}
          onChange={(e) => {
            setJobTitle(e.target.value);
          }}
        />
        <input
          placeholder="job description"
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
          }}
        />
        <input
          placeholder="reward"
          value={reward}
          onChange={(e) => {
            setReward(e.target.value);
          }}
        />
        <button type="submit" value="save" />
      </form>
    </div>
  );
};

export default editjob;
