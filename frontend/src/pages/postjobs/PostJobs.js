import axios from "axios";
import React, { useContext, useState } from "react";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Useridcontext from "../../context/userid-context";
import { Link, useHistory } from "react-router-dom";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import TagsCheckBoxBundle from "../../generalcomponent/TagsCheckBoxBundle";

const PostJobs = () => {
  // context
  const { userId } = useContext(Useridcontext);
  const employerid = userId;

  // useHistory
  let history = useHistory();

  // states for input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");

  // state lifting from tagscheckboxbundle
  const [tags, setTags] = useState([]);

  // button on click function to post a new job
  const handlePostJob = async () => {
    const body = {
      name,
      description,
      reward,
      employerid,
      tags,
    };
    try {
      const endpoint = `http://localhost:5000/postjobs`;
      const res = await axios.post(endpoint, body);
      history.push("/myjobs");
      console.log("Response from backend:", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {userId ? (
        <>
          <h1>New Job Post</h1>
          <InputField
            placeholder="job name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></InputField>
          <InputField
            placeholder="job description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></InputField>
          <InputField
            placeholder="reward"
            value={reward}
            onChange={(e) => {
              setReward(e.target.value);
            }}
          ></InputField>
          <div>Skills:</div>
          <TagsCheckBoxBundle handleData={setTags} />
          <Button onClick={handlePostJob} value="post"></Button>
          <Link to="/myjobs">
            <Button value="cancel"></Button>
          </Link>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default PostJobs;
