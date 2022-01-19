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

const IndividualJob = (props) => {
  //UseContext
  const { userId, picsArray, switchMode, setSwitchMode } =
    useContext(Useridcontext);

  const employerid = userId;

  // save state
  let [jobsData, setJobsData] = useState("");
  const params = useParams();

  const handleModeChange = () => {
    setSwitchMode(false);
  };

  const getJobsDataUnderUser = () => {
    async function fetcher() {
      try {
        const res = await axios.get(
          `http://localhost:5000/individualjob/${userId}`
        );
        console.log("fetched!");
        setJobsData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  };
  useEffect(() => {
    if (userId) {
      getJobsDataUnderUser();
      console.log("fetching data");
      console.log("params.index: ", params.index);
    }
  }, []);

  const handleDelete = (element) => {
    axios
      .delete(`http://localhost:5000/individualjob/delete/${element}`)
      .then(() => {
        getJobsDataUnderUser();
      });
  };

  const handleAccept = (element) => {
    axios
      .put(`http://localhost:5000/individualjob/accept/${element}`)
      .then(() => {
        getJobsDataUnderUser();
      });
  };

  const handleReject = (element) => {
    axios
      .put(`http://localhost:5000/individualjob/reject/${element}`)
      .then(() => {
        getJobsDataUnderUser();
      });
  };
  return (
    <div>
      {userId ? (
        <>
          {/* <Link to="/myjobs">My Jobs</Link> */}
          <div id={styles.sidebar}>
            <h1 className={styles.title}>My Jobs</h1>
            <p>You are viewing as an Employer</p>
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
          {jobsData && (
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
              {jobsData.map((element) => {
                return (
                  <>
                    {console.log(element)}
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
                          <Link to={`/editjob/${element._id}`}>Edit Quest</Link>
                        </p>
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

export default IndividualJob;
