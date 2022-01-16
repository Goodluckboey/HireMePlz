import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Useridcontext from "../../context/userid-context";

const Profile = () => {
  //This is to use the use context. To call the above id in the parent just use call UserIdApp.userId and UserIdApp.setUserId to change state
  const callUserIdApp = useContext(Useridcontext);
  //userId state from main react app is prop down into here
  const userId = callUserIdApp.userId;
  //No need for any state change of userId for all our pages
  //const stateChangeUserId = callUserIdApp.setUserId;
  //This state below is to store the data from the backend for display
  let [displayedProfileData, setProfileData] = useState("");
  const retriveProfileData = () => {
    axios.get(`http://localhost:5000/profile/${userId}`).then((res) => {
      setProfileData(res.data);
    });
  };
  useEffect(() => {
    retriveProfileData();
  }, []);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>{displayedProfileData[0]?.firstname}</p>
      <p>{userId}</p>
      {/* <div>
        {displayedProfileData.map((eachData) => {
          return <p>{eachData.username}</p>;
        })}
      </div> */}
    </div>
  );
};
export default Profile;
