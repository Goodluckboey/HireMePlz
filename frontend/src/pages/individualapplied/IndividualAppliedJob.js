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

const AppliedIndividualJob = (props) => {
  //UseContext
  const { userId, picsArray } = useContext(Useridcontext);

  // save state
  const [appliedJobsData, setAppliedJobsData] = useState("");
  const params = useParams();

  const getJobsDataUnderUser = () => {
    async function fetcher() {
      try {
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
          <Link to="/myjobs">My Jobs</Link>
          {appliedJobsData && (
            <Splide
              options={{
                start: params.index,
                wheel: true,
              }}
            >
              {appliedJobsData.map((element) => {
                return (
                  <>
                    <SplideSlide>
                      <div className={styles.largeJob}>
                        <h1>{element.name}</h1>
                        <p className={styles.description}>
                          Job Description: {element.description}
                        </p>
                        <h2>{element.reward} Copper Coins</h2>
                        <h2>{element.status}</h2>
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
