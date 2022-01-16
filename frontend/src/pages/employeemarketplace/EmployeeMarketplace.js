import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Useridcontext from "../../context/userid-context";
import { Link } from "react-router-dom";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Job from "./parts/Job";
import { v4 as uuidv4 } from "uuid";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import styles from "./parts/modules/ee.module.css";

const EmployeeMarketplace = () => {
  // context
  const { userId, picsArray } = useContext(Useridcontext);

  // states
  const [jobQuery, setJobQuery] = useState("");
  const [fetchedJobs, setFetchedJobs] = useState([]);

  // fetch jobs on mount
  async function fetcher() {
    try {
      const endpoint = `http://127.0.0.1:5000/alljobs`;
      const res = await axios.get(endpoint);
      setFetchedJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (userId) {
      fetcher();
    }
  }, []);

  // button on click function to search for job with this specific name
  const handleSearchJob = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `http://127.0.0.1:5000/searchjobs`;
      const res = await axios.post(endpoint, { query: jobQuery });
      setFetchedJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplyJob = (jobId) => {
    const userIdToAttach = { userId };
    axios
      .put(`http://127.0.0.1:5000/applyjob/${jobId}`, userIdToAttach)
      .then(() => {
        fetcher();
      });
  };

  // create job components to populate page
  const jobs = [];
  for (const job of fetchedJobs) {
    jobs.push(
      <Job
        {...job}
        key={uuidv4()}
        applyJob={() => handleApplyJob(job._id)}
        imageUrl={
          picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
        }
      ></Job>
    );
  }

  return (
    <div>
      {userId ? (
        <>
          <img
            id={styles.marketImage}
            src="/images/adult-g741925a1e_1920.jpg"
            alt=""
          ></img>
          <form>
            <h2 id={styles.marketTitleText}>
              Discover a variety of lifestyles;
              <br /> and Improve your Rank at the same time!
            </h2>
            <div id={styles.searchBar}>
              <input
                placeholder="search jobs by job name"
                value={jobQuery}
                onChange={(e) => {
                  setJobQuery(e.target.value);
                }}
                size="80"
              ></input>
            </div>
            <button
              id={styles.submitButton}
              onClick={handleSearchJob}
              class="btn btn-info"
            >
              Search
            </button>
          </form>
          <div>{jobs}</div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default EmployeeMarketplace;
