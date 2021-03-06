// dependencies
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Useridcontext from "../../context/userid-context";
import { v4 as uuidv4 } from "uuid";

// css modules
import styles from "./parts/modules/ee.module.css";

// child components
import Job from "./parts/Job";
import TagsCheckBoxBundle from "../../generalcomponent/TagsCheckBoxBundle";
import SearchFilter from "../../generalcomponent/SearchFilter";
import { Link, useHistory } from "react-router-dom";

const EmployeeMarketplace = () => {
  // context
  const { userId, picsArray, switchMode, setSwitchMode } =
    useContext(Useridcontext);

  // use history
  const history = useHistory();

  //state change
  // const handleModeChange = () => {
  //   setSwitchMode(false);
  // };

  // states
  const [jobQuery, setJobQuery] = useState("");
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]); // tags
  const [searchType, setSearchType] = useState(""); // search type

  // button on click function to search for job with this specific name
  const handleSearchJob = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const endpoint = `http://127.0.0.1:5000/searchjobs?type=${searchType}`;
      const res = await axios.post(endpoint, {
        query: jobQuery,
        tags,
      });
      setFetchedJobs(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  // fetch jobs on mount, search changes
  useEffect(() => {
    if (switchMode) {
      history.push("/employermarketplace");
    }
    setIsLoading(true);
    const timer = setTimeout(handleSearchJob, 1000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [jobQuery, tags, searchType, switchMode]);

  const handleApplyJob = (jobId) => {
    const userIdToAttach = { userId };
    axios
      .put(`http://127.0.0.1:5000/applyjob/${jobId}`, userIdToAttach)
      .then(() => {
        handleSearchJob();
      });
  };

  // create job components to populate page
  const jobs = [];
  for (const job of fetchedJobs) {
    if (job.status === "Open") {
      jobs.push(
        <div className={styles.card}>
          <Job
            {...job}
            key={uuidv4()}
            applyJob={() => handleApplyJob(job._id)}
            imageUrl={
              picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
            }
          ></Job>
        </div>
      );
    }
  }

  return (
    <div>
      {/* <Link className={styles.switchTo} to="/employermarketplace">
        <button type="button" class="btn btn-danger" onClick={handleModeChange}>
          Switch to Employer
        </button>
      </Link> */}
      {/* <h1>All Available Jobs</h1> */}
      <div className={styles.banner}>
        <img
          id={styles.marketImage}
          src="/images/adult-g741925a1e_1920.jpg"
          alt=""
        ></img>
        <form>
          <h2 id={styles.marketTitleText}>
            Encounter people from all walks of life,
            <br /> and Improve your Rank at the same time!
          </h2>
          <div>
            <input
              id={styles.searchbar}
              type="text"
              placeholder="Search jobs by job name.."
              value={jobQuery}
              onChange={(e) => {
                setJobQuery(e.target.value);
              }}
            ></input>
          </div>

          <TagsCheckBoxBundle handleData={setTags} />
          <SearchFilter setFilter={setSearchType} />

          <button id={styles.submitButton} onClick={handleSearchJob}>
            <i class="fas fa-search"></i>
          </button>
        </form>
        <div className={styles.smallIcons}>
          <i class="fab fa-facebook fa-3x"></i>
          <i class="fab fa-instagram fa-3x"></i>
          <i class="fab fa-twitter fa-3x"></i>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        </div>
      ) : (
        <div id={styles.cardBox}>{jobs}</div>
      )}
    </div>
  );
};

export default EmployeeMarketplace;
