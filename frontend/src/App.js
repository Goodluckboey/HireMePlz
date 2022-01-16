import React, { useState } from "react";
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
import AfterLoggedInHeader from "./generalcomponent/AfterLoggedInHeader";
import Editjob from "./pages/editjob/editjob";

function App() {
  const [userId, setUserId] = useState("");
  // const params = useParams();
  const afterLoggedInHeader = userId && (
    <AfterLoggedInHeader></AfterLoggedInHeader>
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Useridcontext.Provider value={{ userId, setUserId }}>
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
              {afterLoggedInHeader}
              <Profile></Profile>
            </Route>
            <Route exact path="/individualjob/:index">
              <IndividualJob></IndividualJob>
            </Route>
            <Route exact path="/myjobs">
              {afterLoggedInHeader}
              <MyJobs></MyJobs>
            </Route>
            <Route exact path="/postjobs">
              {afterLoggedInHeader}
              <PostJobs></PostJobs>
            </Route>
            <Route exact path="/employeemarketplace">
              {afterLoggedInHeader}
              <EmployeeMarketplace></EmployeeMarketplace>
            </Route>
            <Route exact path="/employermarketplace">
              {afterLoggedInHeader}
              <Editjob></Editjob>
            </Route>
            <Route exact path="/editjob/:jobid">
              {afterLoggedInHeader}
              <Editjob></Editjob>
            </Route>
          </Useridcontext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
