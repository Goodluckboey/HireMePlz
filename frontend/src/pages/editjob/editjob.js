import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./parts/modules/editjob.module.css";
import { Link } from "react-router-dom";
import Useridcontext from "../../context/userid-context";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import TagsCheckBoxBundle from "./parts/tagsBoxCopy";
import { useHistory } from "react-router-dom";

const Editjob = () => {
  // context
  const { userId, picsArray, switchMode, setSwitchMode } =
    useContext(Useridcontext);

  // job id
  const params = useParams();
  const jobid = params.jobid;

  // states for input fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [reward, setReward] = useState("");
  const [oneJobData, setOneJobData] = useState("");
  const [tags, setTags] = useState([]);

  // Submit Button to send to myJobs
  let history = useHistory();

  const historyClick = () => {
    history.push("/myjobs");
  };

  // function for onClick to update job on database
  const handleSave = async (e) => {
    e.preventDefault();
    const editedJob = {
      name: jobTitle,
      description: jobDescription,
      reward,
      tags,
    };
    const endpoint = `http://127.0.0.1:5000/individualjob/edit/${jobid}`;
    try {
      const res = await axios.put(endpoint, editedJob);
      console.log(res);
      history.push("/myjobs");
    } catch (err) {
      console.log(err);
    }
  };

  const showJobId = console.log(`${jobid}`);
  // function to grab specific job data to show to user
  const grabSpecificJob = () => {
    async function fetcher() {
      try {
        const res = await axios.get(`http://localhost:5000/findjob/${jobid}`);
        console.log("fetched specific Job Data!");
        setOneJobData(res.data[0]);
        console.log(oneJobData);
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  };

  useEffect(() => {
    if (userId) {
      grabSpecificJob();
      console.log("fetching data");
    }
  }, []);

  const handleModeChange = () => {
    setSwitchMode(false);
  };

  return (
    <div>
      {userId ? (
        <>
          <div id={styles.sidebar}>
            <h1 className={styles.title}>My Jobs</h1>
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
                class="btn btn-outline-dark col-11 mx-auto"
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
          <div className={styles.wholeEdit}>
            {oneJobData && (
              <div className={styles.editJobPrevious}>
                <div className={styles.cardImgBox}>
                  <img
                    src={
                      picsArray[Math.floor(Math.random() * picsArray.length)]
                        .src.medium
                    }
                    className={styles.cardImg}
                  ></img>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.ctrlBadge}>
                    <span class="badge rounded-pill bg-light text-dark">
                      {oneJobData.status}
                    </span>
                    <p className={styles.cardName}>{oneJobData.name}</p>
                  </div>
                  <p className={styles.cardDescription}>
                    {oneJobData.description}
                  </p>
                  <h4 className={styles.cardReward}>GC {oneJobData.reward} </h4>
                </div>
              </div>
            )}
            <div className={styles.editInput}>
              <form onSubmit={handleSave}>
                <div className={styles.skillsGrp}>
                  <TagsCheckBoxBundle handleData={setTags} />
                </div>
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
                <button type="submit" value="save" class="btn btn-warning">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Editjob;
