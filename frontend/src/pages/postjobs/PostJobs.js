import axios from "axios";
import React, { useContext, useState } from "react";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Useridcontext from "../../context/userid-context";
import { Link, useHistory } from "react-router-dom";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import TagsCheckBoxBundle from "../../generalcomponent/TagsCheckBoxBundle";
import styles from "./parts/modules/postjob.module.css";

const PostJobs = () => {
  // context
  const { userId, setSwitchMode } = useContext(Useridcontext);
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

  const handleModeChange = () => {
    setSwitchMode(true);
  };

  return (
    <div>
      {userId ? (
        <div className={styles.backgroundBody}>
          <div className={styles.encompass}>
            <div id={styles.sidebar}>
              <h1 className={styles.title}>Post a new Job</h1>
              <p>You are viewing as an Employer</p>
              <p>Click on each job for more information</p>
              <div className={styles.buttonGroup}></div>
              <Link to="/myjobs">
                <button
                  type="button"
                  class="btn btn-outline-success col-11 mx-auto"
                  data-mdb-ripple-color="dark"
                  onClick={handleModeChange}
                >
                  Switch to Employee Mode
                </button>
              </Link>
              <Link to="/postjobs">
                <button
                  type="button"
                  class="btn btn-outline-light col-11 mx-auto"
                  data-mdb-ripple-color="dark"
                >
                  Add a new Job
                </button>
              </Link>

              <Link to="/employermarketplace">
                <button
                  type="button"
                  class="btn btn-outline-secondary col-11 mx-auto"
                  data-mdb-ripple-color="dark"
                >
                  Employer Marketplace
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.inputGrp}>
              {/* <h1>New Job Post</h1> */}
              <input
                className={styles.inputBar}
                placeholder="job name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <input
                className={styles.inputBar}
                placeholder="job description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
              <input
                className={styles.inputBar}
                placeholder="reward"
                value={reward}
                onChange={(e) => {
                  setReward(e.target.value);
                }}
              ></input>
            </div>
            <div className={styles.skillsGrp}>
              {/* <div>Skills:</div> */}
              <TagsCheckBoxBundle handleData={setTags} />
            </div>
            <div className={styles.btnGrp}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handlePostJob}
              >
                Post Job
              </button>
              <Link to="/myjobs">
                <button type="button" class="btn btn-light">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default PostJobs;
