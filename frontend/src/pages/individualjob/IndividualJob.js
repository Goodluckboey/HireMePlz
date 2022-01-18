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
  const { userId, picsArray } = useContext(Useridcontext);

  // save state
  let [jobsData, setJobsData] = useState("");
  const params = useParams();

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
          <AfterLoggedInHeader></AfterLoggedInHeader>
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
                        <h1>{element.name}</h1>
                        <p className={styles.description}>
                          Job Description: {element.description}
                        </p>
                        <h2>{element.reward} Copper Coins</h2>
                        <h2>{element.status}</h2>
                        <div>
                          <button
                            type="button"
                            class="btn btn-success"
                            onClick={() => handleAccept(element._id)}
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => handleReject(element._id)}
                          >
                            Reject
                          </button>
                        </div>
                        <button
                          type="button"
                          class="btn btn-link"
                          onClick={() => handleDelete(element._id)}
                        >
                          Delete
                        </button>

                        <Link to={`/editjob/${element._id}`}>Edit Quest</Link>
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
