import React, { useContext, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import "@splidejs/splide/dist/css/splide.min.css";
import Useridcontext from "../../context/userid-context";
import Button from "../../generalcomponent/Button";
import styles from "./parts/modules/IndividualJob.module.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import AfterLoggedInHeader from "../../generalcomponent/AfterLoggedInHeader.js";

const AppliedIndividualJob = (props) => {
  //UseContext
  const { userId, picsArray, switchMode, setSwitchMode } =
    useContext(Useridcontext);

  // save state
  const [appliedJobsData, setAppliedJobsData] = useState("");
  const params = useParams();

  const handleModeChange = () => {
    setSwitchMode(false);
  };

  const getJobsDataUnderUser = () => {
    async function fetcher() {
      try {
        //using same route as the appliedjobs component
        const res = await axios.get(
          `http://127.0.0.1:5000/appliedjobs/${userId}`
        );
        setAppliedJobsData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  };
  useEffect(() => {
    if (userId) {
      getJobsDataUnderUser();
    }
  }, []);

  const handleUnapply = (element) => {
    axios.put(`http://127.0.0.1:5000/appliedjob/cancel/${element}`).then(() => {
      getJobsDataUnderUser();
    });
  };

  return (
    <div>
      {userId ? (
        <>
          {/* <Link to="/myjobs">My Jobs</Link> */}
          <AfterLoggedInHeader></AfterLoggedInHeader>
          <div id={styles.sidebar}>
            <h1 className={styles.title}>My Applied Jobs</h1>
            <p>You are viewing as an Employee</p>
            <p>Click on each job for more information</p>
            <div className={styles.buttonGroup}></div>
            <Link to="/myjobs">
              <button
                type="button"
                class="btn btn-outline-dark col-11 mx-auto"
                data-mdb-ripple-color="dark"
              >
                Back
              </button>
            </Link>
          </div>
          {appliedJobsData && (
            <Splide
              options={{
                start: params.index,
                wheel: true,
                perPage: 3,
                perMove: 2,
                gap: "10px",
                slideFocus: true,
              }}
              className={styles.mainSplider}
            >
              {appliedJobsData.map((element) => {
                return (
                  <>
                    <SplideSlide>
                      <div className={styles.largeJob}>
                        <p class="note note-light">
                          <h3 className={styles.Title}>{element.name}</h3>
                        </p>
                        <p class="note note-info">
                          <p className={styles.description}>
                            Job Description: {element.description}
                          </p>
                          <p>{element.reward} Copper Coins</p>
                          {element.status === "Open" && (
                            <p>
                              <span class="badge rounded-pill bg-light text-dark">
                                {element.status}
                              </span>
                            </p>
                          )}
                          {element.status === "accepted" && (
                            <p>
                              <span class="badge rounded-pill bg-success text-dark ">
                                {element.status}
                              </span>
                            </p>
                          )}
                        </p>
                        <Button
                          onClick={() => handleUnapply(element._id)}
                          value="Cancel Application"
                        ></Button>
                      </div>
                    </SplideSlide>
                  </>
                );
              })}
            </Splide>
          )}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default AppliedIndividualJob;
