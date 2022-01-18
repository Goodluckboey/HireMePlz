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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handleLogin");
  };
  return (
    <div>
      <img
        id={styles.loginImage}
        src="/images/background-g6df07de67_1920.jpg"
        alt=""
      ></img>
      <div className={styles.registerPage}>
        <form>
          <h2 id={styles.welcome}>Join HireUs</h2>
          <div className={styles.inputField}>
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
              className="YOLO"
            />
          </div>
          <div className={styles.inputField}>
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
              className="YOLO"
            />
          </div>
          <div className={styles.inputField}>
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
              className="YOLO"
            />
          </div>
          <div className={styles.inputField}>
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
              className="YOLO"
            />
          </div>
          <p
            className={
              validUsername === "*username is available"
                ? styles.validUserName
                : styles.invalidUserName
            }
          >
            {validUsername}
          </p>
          <div className={styles.inputField}>
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
              className="YOLO"
            />
          </div>
          <div className={styles.inputField}>
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
              className="YOLO"
            />
          </div>
          <div className={styles.inputField}>
            <div>Skills: </div>
            <div className={styles.checkBoxContainer}>
              <TagsCheckBoxBundle handleData={setCheckBoxesData} />
            </div>
          </div>
          <div className={styles.inputField}>
            <Link to="/login">
              <button
                id={styles.signUp}
                className="btn btn-primary"
                onClick={handleSignUp}
                value="Sign up"
              >
                Sign Up
              </button>
            </Link>
          </div>
          <p>
            Already a member? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
