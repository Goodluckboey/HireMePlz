// import dependencies
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import components
import Useridcontext from "../../context/userid-context";
import Button from "../../generalcomponent/Button";
import Job from "./parts/Job";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import AppliedJobs from "../appliedjobs/AppliedJobs";
import styles from "./parts/modules/myJobs.module.css";

const MyJobs = () => {
  // context
  const { userId, picsArray, switchMode, setSwitchMode } =
    useContext(Useridcontext);
  const employerid = userId;

  // states
  const [fetchedJobs, setFetchedJobs] = useState("");

  //state change
  const handleModeChange = () => {
    setSwitchMode(false);
  };
  // fetch jobs on mount
  useEffect(() => {
    async function fetcher() {
      try {
        const endpoint = `http://localhost:5000/myjobs/${employerid}`;
        const res = await axios.get(endpoint);
        setFetchedJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetcher();
    }
  }, [employerid]);

  // create job components to populate page
  const jobs = [];
  if (fetchedJobs) {
    fetchedJobs.map((element, index) => {
      return jobs.push(
        <Link to={`/individualjob/${index}`}>
          <Job
            {...element}
            key={uuidv4()}
            imageUrl={
              picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
            }
          ></Job>
        </Link>
      );
    });
  }

  return (
    <div className={styles.backgroundBody}>
      {userId ? (
        switchMode ? (
          <div className={styles.encompass}>
            <div id={styles.sidebar}>
              <h1 className={styles.title}>My Jobs</h1>
              <div className={styles.buttonGroup}></div>
              <button
                type="button"
                class="btn btn-outline-success col-11 mx-auto"
                data-mdb-ripple-color="dark"
                onClick={handleModeChange}
              >
                Employee Mode
              </button>

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
            <div className={styles.cardBox}>{jobs}</div>
          </div>
        ) : (
          <AppliedJobs />
        )
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default MyJobs;
