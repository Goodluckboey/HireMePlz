import React from "react";
import jobSeedData from "../../Seed/MyJobsSeed";
import Job from "./parts/Job";

const MyJobs = () => {
  const jobs = [];
  for (const job of jobSeedData) {
    jobs.push(<Job {...job}></Job>);
  }
  return (
    <div>
      <h1>My Jobs</h1>
      <button>Add Job</button>
      <div>{jobs}</div>
    </div>
  );
};

export default MyJobs;
