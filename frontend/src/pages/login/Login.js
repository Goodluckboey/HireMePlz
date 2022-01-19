import React, { useContext, useReducer } from "react";
import axios from "axios";
import Useridcontext from "../../context/userid-context";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./parts/modules/login.module.css";

const changeInput = (inputLogin, action) => {
  switch (action.type) {
    case "Username":
      return { ...inputLogin, Username: action.payload.inputLogin };
    case "Password":
      return { ...inputLogin, Password: action.payload.inputLogin };
    default:
      return inputLogin;
  }
};

const Login = () => {
  const [inputLogin, dispatchInput] = useReducer(changeInput, {
    Username: "",
    Password: "",
  });
  //useHistory is like a state. It gets set at the start of the component render.
  let history = useHistory();
  //call the set function for useId and to be updated if there is a match
  const callAndSetUserId = useContext(Useridcontext);
  const setUserId = callAndSetUserId.setUserId;
  // call the userId state in app. Not needed here. Only needed for the console.log
  //const userId = callAndSetUserId.userId;

  //function to compare username to get the userid
  const retriveUserNameToRetriveUserId = () => {
    //This userLogin has to match the object in back end. This input field is the req.body as tested in postman.
    const userLogin = {
      username: inputLogin.Username,
      hash: inputLogin.Password,
    };
    //Login at backend checks if the username matches the password. The password is bcrypted so if the correct password matches the username, the hash in the db and the password hash will match and valid = true
    axios.post("http://localhost:5000/login", userLogin).then((res) => {
      if (res.data.valid) {
        setUserId(res.data.user._id);
        routeToNext();
      } else {
        alert("Wrong username or password");
      }
    });
  };
  //This changes the address bar to what we want.
  const routeToNext = () => {
    return history.push("/employeemarketplace");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    retriveUserNameToRetriveUserId();
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    return history.push("/registration");
  };

  // inline styles
  const buttonStyle = {
    width: "250px",
    height: "40px",
    borderRadius: "30px",
    marginTop: "10px",
  };
  const inputStyle = { ...buttonStyle };

  return (
    <>
      <img
        className={styles.background}
        src="./images/background-g6df07de67_1920.jpg"
      ></img>
      <div id={styles.login}>
        <div id={styles.welcome}>Sign In to HireUs</div>
        <input
          type="text"
          value={inputLogin.Username}
          onChange={(event) => {
            dispatchInput({
              type: "Username",
              payload: { inputLogin: event.target.value },
            });
          }}
          placeholder="Username"
          style={inputStyle}
        ></input>
        <input
          type="password"
          value={inputLogin.Password}
          onChange={(event) => {
            dispatchInput({
              type: "Password",
              payload: { inputLogin: event.target.value },
            });
          }}
          placeholder="Password"
          style={inputStyle}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
          style={buttonStyle}
        >
          continue
        </button>
        <p className={styles.notAMember}>
          Not a member? <Link to="/registration">Join Now</Link>
        </p>
        <div id={styles.backToHome}>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
