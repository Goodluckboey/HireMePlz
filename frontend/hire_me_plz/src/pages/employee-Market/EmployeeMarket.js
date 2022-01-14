import React, { useState } from "react";
import seedData from "../../Seed/MyJobsSeed";
import Job from "../myjobs/parts/Job";

const EmployeeMarket = () => {
  const [jobQuery, setJobQuery] = useState("");
  const jobs = [];
  for (const job of seedData) {
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
