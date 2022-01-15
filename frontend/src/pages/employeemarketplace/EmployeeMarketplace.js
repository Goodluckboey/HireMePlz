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
    fetcher();
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

  // function for apply job
  const applyJob = (jobId) => {
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
      <Job {...job} key={uuidv4()} applyJob={() => applyJob(job._id)}></Job>
    );
  }

  return (
    <div>
      <Link to="/postjobs">Add Job</Link>
      <form>
        <InputField
          placeholder="search jobs by job name"
          value={jobQuery}
          onChange={(e) => {
            setJobQuery(e.target.value);
          }}
        ></InputField>
        <Button type="submit" value="Search" onClick={handleSearchJob}></Button>
      </form>
      <div>{jobs}</div>
    </div>
  );
};

export default EmployeeMarketplace;
