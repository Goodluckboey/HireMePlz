import React, { useReducer, useState } from "react";
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

  const handleSignUp = () => {
    console.log("handleSignUp");
  };
  const handleLogin = () => {
    console.log("handleLogin");
  };
  return (
    <div className="registration-page">
      <InputField
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
    </div>
  );
};

export default Registration;
