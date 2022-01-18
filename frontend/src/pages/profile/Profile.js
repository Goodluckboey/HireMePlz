// dependencies
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Useridcontext from "../../context/userid-context";

const Profile = () => {
  // useContext
  const { userId } = useContext(Useridcontext);

  const [profileData, setProfileData] = useState("");
  const retriveProfileData = () => {
    axios.get(`http://localhost:5000/profile/${userId}`).then((res) => {
      setProfileData(res.data);
    });
  };

  useEffect(() => {
    retriveProfileData();
  }, []);

  return (
    <div style={{ width: "60%", margin: "100px auto 0 auto" }}>
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
            {profileData && profileData[0].tags.map((elem) => <h5>elem</h5>)
              }
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Profile;
