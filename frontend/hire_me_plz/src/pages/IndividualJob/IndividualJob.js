import React, { useContext, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import "@splidejs/splide/dist/css/splide.min.css";
import Useridcontext from "../../context/userid-context";
import Button from "../../generalcomponent/Button";
import styles from "./parts/modules/IndividualJob.module.css";

const IndividualJob = (props) => {
  //UseContext
  const callUserIdApp = useContext(Useridcontext);
  const userId = callUserIdApp.userId;

  // save state
  let [jobsData, setJobsData] = useState("");

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
    getJobsDataUnderUser();
    console.log("fetching data");
  }, []);

  const applyForJob = () => {
    console.log("Applied for this Job!");
  };

  return (
    <div>
      <Splide>
        {jobsData &&
          jobsData.map((element) => {
            return (
              <>
                <h1>{element.name}</h1>
                <SplideSlide>
                  <div className={styles.largeJob}>
                    <h1>{element.name}</h1>
                    <p className={styles.description}>
                      Job Description: {element.description}
                    </p>
                    <h2>{element.reward} Copper Coins</h2>
                    <h2>{element.status}</h2>
                    <Button onClick={applyForJob} value="Apply"></Button>
                  </div>
                </SplideSlide>
              </>
            );
          })}

        {/* {jobsData ? <div>hello</div> : <div>no jobs</div>} */}
      </Splide>
      {/* <Splide>{jobCards}</Splide> */}
      <h1>hello world</h1>
      {/* <h1>{jobCards}</h1> */}
    </div>
  );
};

export default IndividualJob;
