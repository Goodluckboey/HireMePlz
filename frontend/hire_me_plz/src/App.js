import logo from "./logo.svg";
import "./App.css";
import IndividualJob from "./pages/IndividualJob/IndividualJob";
// import FrontPage from "./pages/front/front.js";

function App() {
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
        <IndividualJob></IndividualJob>
      </header>
    </div>
  );
}

export default App;
