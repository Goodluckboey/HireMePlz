import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Job from "../MyJobs/parts/Job";

const EmployeeMarketplace = () => {
  // states
  const [jobQuery, setJobQuery] = useState("");
  const [fetchedJobs, setFetchedJobs] = useState([]);

  // fetch jobs on mount
  useEffect(() => {
    async function fetcher() {
      try {
        const endpoint = `http://127.0.0.1:5000/alljobs`;
        const res = await axios.get(endpoint);
        setFetchedJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  }, []);

  // button on click function to search for job with this specific name
  const handleSearchJob = async () => {
    try {
      const endpoint = `http://127.0.0.1:5000/searchjobs`;
      const jobs = await axios.post(endpoint, { query: jobQuery });
      setFetchedJobs(jobs);
    } catch (err) {
      console.log(err);
    }
  };

  // create job components to populate page
  const jobs = [];
  for (const job of fetchedJobs) {
    jobs.push(<Job {...job}></Job>);
  }

  return (
    <div>
      <Link to="/postjobs">Add Job</Link>
      <InputField
        placeholder="search jobs by job name"
        value={jobQuery}
        onChange={(e) => {
          setJobQuery(e.target.value);
        }}
      ></InputField>
      <Button value="Search" onClick={handleSearchJob}></Button>
      <div>{jobs}</div>
    </div>
  );
};

export default EmployeeMarketplace;
