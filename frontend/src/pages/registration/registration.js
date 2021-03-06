// dependencies
import axios from "axios";
import React, { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

// css modules
import styles from "./parts/modules/registration.module.css";

// child components
import TagsCheckBoxBundle from "./parts/TagsCheckBoxBundle";

// reducer function for input field's useReducer
const changeInput = (input, action) => {
  switch (action.type) {
    case "First Name":
      return { ...input, firstName: action.payload.input };
    case "Last Name":
      return { ...input, lastName: action.payload.input };
    case "Email":
      return { ...input, email: action.payload.input };
    case "Username":
      return { ...input, userName: action.payload.input };
    case "Password":
      return { ...input, password: action.payload.input };
    case "Retype Password":
      return { ...input, retypePassword: action.payload.input };
    default:
      return input;
  }
};

// functional component starts here
const Registration = () => {
  // usestate to track checkboxes
  const [checkBoxesData, setCheckBoxesData] = useState([]);

  // state to track validity of username
  const [validUsername, setValidUsername] = useState("empty");

  // This is to set the state to be used as value in the input. State is required to allow inputs in the fields
  const [input, dispatchInput] = useReducer(changeInput, {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    retypePassword: "",
  });

  useEffect(() => {
    const username = input.userName;
    async function userNameValidation() {
      try {
        const endpoint = "http://127.0.0.1:5000/doesusernameexist";
        const res = await axios.post(endpoint, { username });
        const exist = res.data.data;
        if (exist) {
          setValidUsername("*username already taken");
        } else {
          setValidUsername("*username is available");
        }
      } catch (err) {
        console.log(err);
        setValidUsername("*error checking username");
      }
    }
    if (username === "") {
      setValidUsername("*username field empty");
    } else {
      userNameValidation();
    }
  }, [input.userName]);

  const handleSignUp = (e) => {
    e.preventDefault();
    const post = async () => {
      const data = {
        firstname: input.firstName,
        lastname: input.lastName,
        email: input.email,
        username: input.userName,
        hash: input.password,
        tags: checkBoxesData,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/registration",
          data
        );
        console.log(response);
        console.log("sent data to mongo");
      } catch (error) {
        console.log(error);
      }
    };
    post();
  };
  // inline styles
  const buttonStyle = {
    width: "250px",
    height: "40px",
    borderRadius: "30px",
    marginTop: "10px",
  };

  return (
    <div className={styles.registerPage}>
      <img
        className={styles.background}
        src="./images/background-g6df07de67_1920.jpg"
      ></img>
      <div className={styles.registerSegment}>
        <h2 id={styles.welcome}>Join HireUs</h2>
        <form>
          <input
            type="text"
            value={input.firstName}
            onChange={(event) => {
              dispatchInput({
                type: "First Name",
                payload: { input: event.target.value },
              });
            }}
            placeholder="First Name"
            className={styles.inputField}
          />
          <input
            type="text"
            value={input.lastName}
            onChange={(event) => {
              dispatchInput({
                type: "Last Name",
                payload: { input: event.target.value },
              });
            }}
            placeholder="Last Name"
            className={styles.inputField}
          />
          <input
            type="email"
            value={input.email}
            onChange={(event) => {
              dispatchInput({
                type: "Email",
                payload: { input: event.target.value },
              });
            }}
            placeholder="Email"
            className={styles.inputField}
          />
          <input
            type="text"
            value={input.userName}
            onChange={(event) => {
              dispatchInput({
                type: "Username",
                payload: { input: event.target.value },
              });
            }}
            placeholder="Username"
            className={styles.inputField}
          />
          <p
            className={
              validUsername === "*username is available"
                ? styles.validUserName
                : styles.invalidUserName
            }
          >
            {validUsername}
          </p>
          <input
            type="password"
            value={input.password}
            onChange={(event) => {
              dispatchInput({
                type: "Password",
                payload: { input: event.target.value },
              });
            }}
            placeholder="Password"
            className={styles.inputField}
          />
          <input
            type="password"
            value={input.retypePassword}
            onChange={(event) => {
              dispatchInput({
                type: "Retype Password",
                payload: { input: event.target.value },
              });
            }}
            placeholder="Retype Password"
            className={styles.inputField}
          />
          <div className={styles.skills}>Skills:</div>
          <TagsCheckBoxBundle handleData={setCheckBoxesData} />
          <Link to="/login">
            <button
              id={styles.signUp}
              className="btn btn-primary"
              onClick={handleSignUp}
              value="Sign up"
              style={buttonStyle}
              type="submit"
            >
              Sign Up
            </button>
          </Link>
        </form>
        <p className={styles.alreadyAMember}>
          Already a member? <Link to="/login">Login here</Link>
        </p>
        <div id={styles.backToHome}>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
