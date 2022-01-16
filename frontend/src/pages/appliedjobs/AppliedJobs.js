import React, { useContext, useEffect, useState } from "react";
import Useridcontext from "../../context/userid-context";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../../generalcomponent/Button";
import AppliedJob from "./parts/AppliedJob";

const AppliedJobs = () => {
  const { userId, picsArray, setSwitchMode } = useContext(Useridcontext);
  //state
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
        <AppliedJob
          {...eachJob}
          key={uuidv4}
          imageUrl={
            picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
          }
        />
      );
    });
  }
  return (
    <div>
      <Link to="/employeemarketplace">
        <Button value="Employer Marketplace"></Button>
      </Link>
      <Button onClick={handleModeChange} value="Employee Mode" />
      <h1>Applied Jobs</h1>
      {appliedJobs}
    </div>
  );
};

export default AppliedJobs;
