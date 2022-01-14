import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Button from "../../generalcomponent/Button";
// import Jobs from "../../Seed/MyJobsSeed";
import styles from "./parts/modules/IndividualJob.module.css";

const Jobs = [
  {
    name: "Kill 10 Dragons",
    description: "Head to Jenkinville and slay 10 dragons by the mountain.",
    reward: 50000,
    status: "Open",
  },
  {
    name: "Kill 100 Slimes",
    description: "Head to Mt. Vermont and defeat 100 slimes.",
    reward: 5000,
    status: "Open",
  },
  {
    name: "Find a missing cat",
    description:
      "There is a missing black cat with white ears in town. Find it",
    reward: 2000,
    status: "Open",
  },
];

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
