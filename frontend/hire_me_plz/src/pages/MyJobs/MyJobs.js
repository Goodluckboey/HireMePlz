import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../generalcomponent/Button";
import Job from "./parts/Job";
import Useridcontext from "../../context/userid-context";

const MyJobs = () => {
  // context
  const userIdContext = useContext(Useridcontext);
  const employerid = userIdContext.userId;

  // states
  const [fetchedJobs, setFetchedJobs] = useState("");

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
    fetcher();
  }, []);

  // create job components to populate page
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
