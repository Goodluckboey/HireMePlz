import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Useridcontext from "../../context/userid-context";
import { Link } from "react-router-dom";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Job from "./parts/Job";
import { v4 as uuidv4 } from "uuid";

const EmployeeMarketplace = () => {
  // states
  const [jobQuery, setJobQuery] = useState("");
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const callAndSetUserId = useContext(Useridcontext);
  const userId = callAndSetUserId.userId;
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
  const attachEmployeeId = (jobId) => {
    const userIdToAttach = {
      userId: userId,
    };
    axios
      .put(`http://127.0.0.1:5000/applyjob/${jobId}`, userIdToAttach)
      .then(() => {
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
      });
  };
  const jobs = [];
  for (const job of fetchedJobs) {
    jobs.push(
      <Job
        {...job}
        key={uuidv4()}
        onClick={() => attachEmployeeId(job._id)}
      ></Job>
    );
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
