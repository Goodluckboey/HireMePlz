import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Button from "../../generalcomponent/Button";
import Jobs from "../../Seed/MyJobsSeed";
import styles from "./parts/modules/IndividualJob.module.css";

const IndividualJob = (props) => {
  const applyForJob = () => {
    console.log("Applied for this Job!");
  };
  const acceptApplier = () => {
    console.log("Applicant Accepted!");
  };

  const jobCards = Jobs.map((element, index) => {
    return (
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
    );
  });

  return (
    <div>
      <Splide>{jobCards}</Splide>
    </div>
  );
};

export default IndividualJob;
