import React, { useContext, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import "@splidejs/splide/dist/css/splide.min.css";
import Button from "../../generalcomponent/Button";
import styles from "./parts/modules/IndividualJob.module.css";
import Useridcontext from "../../context/userid-context";

const IndividualJob = (props) => {
  const callUserIdApp = useContext(Useridcontext);
  //userId state from main react app is prop down into here
  const userId = callUserIdApp.userId;
  //No need for any state change of userId for all our pages
  //const stateChangeUserId = callUserIdApp.setUserId;
  //This state below is to store the data from the backend for display
  let [userData, setUserData] = useState("");
  const getJobsDataUnderUser = () => {
    // console.log(params.id);
    axios.get(`http://localhost:5000/individualjob/${userId}`).then((res) => {
      setUserData(res);
    });
  };
  useEffect(() => {
    getJobsDataUnderUser();
  }, []);

  const applyForJob = () => {
    console.log("Applied for this Job!");
  };

  const jobCards = <h1>Hello World {userData.data[0].name}</h1>;

  // fetchedJobs.map((element) => {
  //   return (
  //     <SplideSlide>
  //       <div className={styles.largeJob}>
  //         <h1>{element.name}</h1>
  //         <p className={styles.description}>
  //           Job Description: {element.description}
  //         </p>
  //         <h2>{element.reward} Copper Coins</h2>
  //         <h2>{element.status}</h2>
  //         <Button onClick={applyForJob} value="Apply"></Button>
  //       </div>
  //     </SplideSlide>
  //   );

  // });

  return (
    <div>
      <Splide>{jobCards}</Splide>
    </div>
  );
};

export default IndividualJob;
