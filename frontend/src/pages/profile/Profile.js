// dependencies
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Useridcontext from "../../context/userid-context";

const Profile = () => {
  // useContext
  const { userId } = useContext(Useridcontext);
  const retrieveCompletedPostedJob = { _id: userId };
  const [profileData, setProfileData] = useState("");
  const [completedJobs, setCompletedJobs] = useState("");
  const [postedJobs, setPostedJobs] = useState("");
  const retriveProfileData = () => {
    axios.get(`http://localhost:5000/profile/${userId}`).then((res) => {
      setProfileData(res.data);
    });
  };

  const retriveCompletedData = (typeOfStatus) => {
    if (typeOfStatus === "Completed") {
      axios
        .post(`http://127.0.0.1:5000/profile/completed/history`, {
          ...retrieveCompletedPostedJob,
          status: typeOfStatus,
        })
        .then((res) => {
          setCompletedJobs(res.data);
        });
    } else if (typeOfStatus === "Posted") {
      axios
        .post(`http://127.0.0.1:5000/profile/completed/history`, {
          ...retrieveCompletedPostedJob,
          status: typeOfStatus,
        })
        .then((res) => {
          setPostedJobs(res.data);
        });
    }

    // .post("http://127.0.0.1:5000/profile/completed/history", {
    //   ...retrieveCompletedPostedJob,
    //   status: typeOfStatus,
    // })
    // .then((res) => {
    //   setCompletedJobs(res.data);
    // });
  };

  useEffect(() => {
    retriveProfileData();
    retriveCompletedData("Completed");
    //posted is a random typeOfStatus to proc the if else loop
    retriveCompletedData("Posted");
  }, []);

  return (
    <div style={{ width: "60%", margin: "200px auto 0 auto" }}>
      <h1>Your Profile</h1>
      <div class="list-group">
        <div
          href="#"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Username</h5>
            <small>Edit</small>
          </div>
          <h3 class="mb-1">{profileData && profileData[0].username}</h3>
        </div>
        <div href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Email</h5>
            <small class="text-muted">Edit</small>
          </div>
          <h3 class="mb-1">{profileData && profileData[0].email}</h3>
        </div>
        <div href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Full Name</h5>
            <small class="text-muted">Edit</small>
          </div>
          <h3 class="mb-1">
            {profileData &&
              profileData[0].firstname + " " + profileData[0].lastname}
          </h3>
        </div>
        <div href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Skills</h5>
            <small class="text-muted">Edit</small>
          </div>
          <h3 class="mb-1">
            {profileData && profileData[0].tags.map((elem) => <h5>{elem}</h5>)}
          </h3>
        </div>
        <div href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Completed Jobs</h5>
          </div>
          <h3 class="mb-1">
            {completedJobs &&
              completedJobs.map((elem) => (
                <div>
                  <p>{elem.name}</p>
                  <p>{elem.description}</p>
                  <p>{elem.reward}</p>
                </div>
              ))}
          </h3>
        </div>
        <div href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Posted Jobs</h5>
          </div>
          <h3 class="mb-1">
            {postedJobs &&
              postedJobs.map((elem) => (
                <>
                  <p>{elem.name}</p>
                  <p>{elem.description}</p>
                  <p>{elem.reward}</p>
                </>
              ))}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Profile;
