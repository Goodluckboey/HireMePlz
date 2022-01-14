import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../generalcomponent/Button";
import Job from "./parts/Job";

const MyJobs = () => {
  const [fetchedJobs, setFetchedJobs] = useState("");
  const employerid = "";
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
    fetcher();
  }, []);

  const jobs = [];
  for (const job of fetchedJobs) {
    jobs.push(<Job {...job}></Job>);
  }
  return (
    <div>
      <h1>My Jobs</h1>
      <Button value="Add Job"></Button>
      <div>{jobs}</div>
    </div>
  );
};

export default MyJobs;
