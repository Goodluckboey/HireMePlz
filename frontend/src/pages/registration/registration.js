import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
// import { useParams } from "react-router-dom";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";

//Use reducer to have 5 states
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

const Registration = () => {
  // This is to set the state to be used as value in the input. State is required to allow inputs in the fields
  const [input, dispatchInput] = useReducer(changeInput, {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    retypePassword: "",
  });

  const handleSignUp = (e) => {
    const post = async () => {
      const data = {
        firstname: input.firstName,
        lastname: input.lastName,
        email: input.email,
        username: input.userName,
        hash: input.password,
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
    <div className="registration-page">
      <form>
        <InputField
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
        <InputField
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
        <InputField
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
        <InputField
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
        <p>*username exists</p>
        <InputField
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
        <InputField
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
        <Button onClick={handleSignUp} value="Sign up"></Button>
        <Button onClick={handleLogin} value="Login"></Button>
        <p>Already a member? Login here</p>
      </form>
    </div>
  );
};

export default Registration;
