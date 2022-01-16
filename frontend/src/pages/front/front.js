import React, { useState, useContext } from "react";
import FrontPageHeader from "./parts/FrontPageHeader";
import axios from "axios";
import Job from "../employeemarketplace/parts/Job";
import { v4 as uuidv4 } from "uuid";
import Useridcontext from "../../context/userid-context";

const FrontPage = () => {
  const callAndSetUserId = useContext(Useridcontext);
  const userId = callAndSetUserId.userId;
  let [foundJobData, setFoundJobData] = useState("");
  const [jobQuery, setJobQuery] = useState("");

  // sends searchquery data into state onChange
  // calls the searchAPI with the searchquery data
  // runs map on searchResults, and produces showdata on mount(entire function should be a useEffect)

  // const pullJobData = () => {
  //   async function fetcher() {
  //     try {
  //       const jobs = await axios.post(`http://localhost:5000/searchjobs`, {
  //         query: jobQuery,
  //       });
  //       setFoundJobData(jobs);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetcher();
  // };

  // const attachEmployeeId = (jobId) => {
  //   const userIdToAttach = {
  //     userId: userId,
  //   };
  //   axios
  //     .put(`http://127.0.0.1:5000/applyjob/${jobId}`, userIdToAttach)
  //     .then(() => {
  //       async function fetcher() {
  //         try {
  //           const endpoint = `http://127.0.0.1:5000/alljobs`;
  //           const res = await axios.get(endpoint);
  //           setFoundJobData(res.data);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       fetcher();
  //     });
  // };

  // const jobs = [];
  // if (foundJobData === true) {
  //   for (const element of foundJobData) {
  //     jobs.push(
  //       <Job
  //         {...element}
  //         key={uuidv4()}
  //         onClick={() => attachEmployeeId(element._id)}
  //       ></Job>
  //     );
  //   }
  // }

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
            // onChange={(e) => {
            //   setJobQuery(e.target.value);
            // }}
            // onClick={pullJobData()}
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
