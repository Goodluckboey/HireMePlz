import axios from "axios";
import React, { useContext, useState } from "react";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Useridcontext from "../../context/userid-context";

const PostJobs = () => {
  // context
  const userIdContext = useContext(Useridcontext);
  const employerid = userIdContext.userId;

  // states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");

  // button on click function to post a new job
  const handlePostJob = async () => {
    const body = {
      name,
      description,
      reward,
      employerid,
    };
    try {
      const endpoint = `http://localhost:5000/postjobs`;
      const res = await axios.post(endpoint, body);
      console.log("New job created on backend: ", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>New Job Post</h1>
      <InputField
        placeholder="Job Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></InputField>
      <InputField
        placeholder="Job Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></InputField>
      <InputField
        placeholder="Reward"
        value={reward}
        onChange={(e) => {
          setReward(e.target.value);
        }}
      ></InputField>
      <Button onClick={handlePostJob}>Add New Job</Button>
    </div>
  );
};

export default PostJobs;
