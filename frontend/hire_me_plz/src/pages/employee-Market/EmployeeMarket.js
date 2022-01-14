import axios from "axios";
import React, { useEffect, useState } from "react";
import Job from "../myjobs/parts/Job";

const EmployeeMarket = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [fetchedJobs, setFetchedJobs] = useState([]);

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

  const handleSearchJob =  async () => {
    const endpoint = `http://127.0.0.1:5000/`
    const jobs =  await axios.get()
  }

  const jobs = [];
  for (const job of fetchedJobs) {
    jobs.push(<Job {...job}></Job>);
  }
  return (
    <div>
      <form>
        <input
          placeholder="search for jobs"
          value={jobQuery}
          onChange={(e) => {
            setJobQuery(e.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
      <div>{jobs}</div>
    </div>
  );
};

export default EmployeeMarket;
