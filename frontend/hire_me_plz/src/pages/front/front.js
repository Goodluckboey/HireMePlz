import React, { useEffect, useState } from "react";
import FrontPageHeader from "./parts/FrontPageHeader";
import axios from "axios";

const FrontPage = () => {
  let [foundJobData, setFoundJobData] = useState("");
  const [jobQuery, setJobQuery] = useState("");

  const pullJobData = () => {
    async function fetcher() {
      try {
        const jobs = await axios.post(`http://localhost:5000/searchjobs`, {
          query: jobQuery,
        });
        setFoundJobData(jobs);
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  };

  const jobs = [];
  for (const job of foundJobData) {
    jobs.push(
      <Job
        {...job}
        key={uuidv4()}
        onClick={() => attachEmployeeId(job._id)}
      ></Job>
    );
  }

  return (
    <div id="FrontPage">
      <div>
        <FrontPageHeader></FrontPageHeader>
      </div>
      <div>
        <form>
          <input
            id="searchbar"
            type="text"
            placeholder="Search.."
            onChange={(e) => {
              setJobQuery(e.target.value);
            }}
            onClick={pullJobData()}
          ></input>
        </form>
      </div>
      <div>
        <h1>Why Choose Us?</h1>
      </div>
    </div>
  );
};

export default FrontPage;
