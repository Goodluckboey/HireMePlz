import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Profile from "./pages/profile/Profile";
import Useridcontext from "./context/userid-context";
import Registration from "./pages/registration/registration";
import Login from "./pages/login/Login";
// import FrontPage from "./pages/front/front.js";

function App() {
  const [userId, setUserId] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* <FrontPage></FrontPage> */}
      </header>
      <body>
        <Useridcontext.Provider value={(userId, setUserId)}>
          <Profile />
          <Login></Login>
          {/* <Registration /> */}
        </Useridcontext.Provider>
      </body>
    </div>
  );
}

export default App;
