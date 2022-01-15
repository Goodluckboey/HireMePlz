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
import MyJobs from "./pages/MyJobs/MyJobs";
// import { useParams } from "react-router";

function App() {
  const [userId, setUserId] = useState("");
  // const params = useParams();
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
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
                <Profile></Profile>
              </Route>
              <Route exact path="/individualjob/">
                <IndividualJob></IndividualJob>
              </Route>
            </Useridcontext.Provider>
          </Switch>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
