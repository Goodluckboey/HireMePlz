import React, { useContext, useEffect, useState } from "react";
import Useridcontext from "../../context/userid-context";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../../generalcomponent/Button";
import AppliedJob from "./parts/AppliedJob";
import styles from "../myjobs/parts/modules/myJobs.module.css";

const AppliedJobs = () => {
  const { userId, picsArray, setSwitchMode } = useContext(Useridcontext);
  // states
  const [fetchAppliedJobs, setFetchAppliedJobs] = useState("");
  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:5000/appliedjobs/${userId}`)
        .then((res) => setFetchAppliedJobs(res.data));
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  const handleModeChange = () => {
    setSwitchMode(true);
  };

  //create applied job component to populate page
  const appliedJobs = [];

  if (fetchAppliedJobs) {
    fetchAppliedJobs.map((eachJob, index) => {
      return appliedJobs.push(
        // <Link to={`/appliedjob/${index}`}>
        <AppliedJob
          {...eachJob}
          key={uuidv4}
          imageUrl={
            picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
          }
          setFetchAppliedJobs={setFetchAppliedJobs}
          userId={userId}
          jobData={fetchAppliedJobs}
        />
        // </Link>
      );
    });
  }
  return (
    // <div>
    //   <Link to="/employeemarketplace">
    //     <Button value="Employee Marketplace"></Button>
    //   </Link>
    //   <Button onClick={handleModeChange} value="Employer Mode" />
    //   <h1>Applied Jobs</h1>
    //   {<div>{appliedJobs}</div>}
    // </div>
    <div className={styles.encompass}>
      <div id={styles.sidebar}>
        <h1 className={styles.title}>Applied Jobs</h1>
        <p>You are viewing as an Employee</p>
        <p>Click on each job for more information</p>
        <div className={styles.buttonGroup}></div>
        <button
          type="button"
          class="btn btn-outline-danger col-11 mx-auto"
          data-mdb-ripple-color="dark"
          onClick={handleModeChange}
        >
          Switch to Employer Mode
        </button>
        <Link to="/employeemarketplace">
          <button
            type="button"
            class="btn btn-outline-secondary col-11 mx-auto"
            data-mdb-ripple-color="dark"
          >
            Employee Marketplace
          </button>
        </Link>
      </div>
      <div className={styles.cardBox}>{appliedJobs}</div>
    </div>
  );
};

export default AppliedJobs;
