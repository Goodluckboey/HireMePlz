import React from "react";
import Button from "./parts/Button";
import InputField from "./parts/InputField";

const Registration = () => {
  const handleSignUp = () => {
    console.log("handleSignUp");
  };
  const handleLogin = () => {
    console.log("handleLogin");
  };
  return (
    <div className="registration-page">
      <InputField placeholder="First Name" className="YOLO" />
      <InputField placeholder="Last" className="YOLO" />
      <InputField placeholder="Email" className="YOLO" />
      <InputField placeholder="Username" className="YOLO" />
      <p>*username exists</p>
      <InputField placeholder="Password" className="YOLO" />
      <InputField placeholder="Retype Password" className="YOLO" />
      <Button onClick={handleSignUp} value="Sign up"></Button>
      <Button onClick={handleLogin} value="Login"></Button>
      <p>Already a member? Login here</p>
    </div>
  );
};

export default Registration;
