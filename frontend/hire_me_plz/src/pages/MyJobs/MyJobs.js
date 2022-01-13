import React from "react";

const MyJobs = () => {
  const jobs = (
    <div>
      <img />
      <div>Job Name</div>
      <div>Job Description</div>
      <div>Status</div>
      <div>Delete</div>
      <div>Edit</div>
    </div>
  );
  return (
    <div>
      <h1>My Jobs</h1>
      <button>Add Job</button>
      <div>{jobs}</div>
    </div>
  );
};

export default MyJobs;
