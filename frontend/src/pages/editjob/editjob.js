import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./parts/modules/editjob.module.css";
import { Link } from "react-router-dom";
import Useridcontext from "../../context/userid-context";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";

const Editjob = () => {
  // context
  const { userId } = useContext(Useridcontext);

  // job id
  const params = useParams();
  const jobid = params.jobid;

  // states for input fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [reward, setReward] = useState("");
  const [oneJobData, setOneJobData] = useState("");

  // function for onClick to update job on database
  const handleSave = async (e) => {
    e.preventDefault();
    const editedJob = {
      name: jobTitle,
      description: jobDescription,
      reward,
    };
    const endpoint = `http://127.0.0.1:5000/individualjob/edit/${jobid}`;
    try {
      const res = await axios.put(endpoint, editedJob);
      console.log(res);
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

  return (
    <div>
      {userId ? (
        <>
          {oneJobData && (
            <div className={styles.editJobPrevious}>
              <h1>{oneJobData.name}</h1>
              <h3>{oneJobData.description}</h3>
              <h3>{oneJobData.reward}</h3>
              <h2>{oneJobData.status}</h2>
            </div>
          )}
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
            {/* <Link to="/individualjob"> */}
            <button type="submit" value="save">
              Submit
            </button>
            {/* </Link> */}
          </form>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Editjob;
