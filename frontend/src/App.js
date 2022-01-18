import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import logo from "./logo.svg";
import "./App.css";
import Profile from "./pages/profile/Profile";
import Useridcontext from "./context/userid-context";
import Registration from "./pages/registration/registration";
import Login from "./pages/login/Login";
import IndividualJob from "./pages/individualjob/IndividualJob";
import FrontPage from "./pages/front/front.js";
import MyJobs from "./pages/myjobs/MyJobs";
import EmployeeMarketplace from "./pages/employeemarketplace/EmployeeMarketplace";
import PostJobs from "./pages/postjobs/PostJobs";
import Header from "./generalcomponent/Header";
import Editjob from "./pages/editjob/editjob";
import axios from "axios";
import EmployerMarketplace from "./pages/employermarketplace/EmployerMarketplace";
import AppliedIndividualJob from "./pages/individualapplied/IndividualAppliedJob";

function App() {
  // top level states: userid and random pics
  const [switchMode, setSwitchMode] = useState(false); //false = employEE, true = employER
  const [userId, setUserId] = useState("");
  const [picsArray, setPicsArray] = useState("");
  const apiKey = "563492ad6f917000010000011ffd758dc43247008b50f4fd9d528ff2";

  // fetch random images for usage
  useEffect(() => {
    async function fetchRandomPics() {
      const endpoint = "https://api.pexels.com/v1/curated?per_page=30";
      const res = await axios.get(endpoint, {
        headers: { Authorization: `${apiKey}` },
      });
      const data = res.data;
      setPicsArray(data.photos);
    }
    fetchRandomPics();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Useridcontext.Provider
            value={{ userId, setUserId, picsArray, switchMode, setSwitchMode }}
          >
            <Header />
            <Route exact path="/">
              <FrontPage></FrontPage>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/registration">
              <Registration></Registration>
            </Route>
            <Route exact path="/profile/">
              <Profile></Profile>
            </Route>
            <Route exact path="/individualjob/:index">
              <IndividualJob></IndividualJob>
            </Route>
            <Route exact path="/appliedjob/:index">
              <AppliedIndividualJob></AppliedIndividualJob>
            </Route>
            <Route exact path="/myjobs">
              <MyJobs></MyJobs>
            </Route>
            <Route exact path="/postjobs">
              <PostJobs></PostJobs>
            </Route>
            <Route exact path="/employeemarketplace">
              <EmployeeMarketplace></EmployeeMarketplace>
            </Route>
            <Route exact path="/employermarketplace">
              <EmployerMarketplace></EmployerMarketplace>
            </Route>
            <Route exact path="/editjob/:jobid">
              <Editjob></Editjob>
            </Route>
          </Useridcontext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
