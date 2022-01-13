import React, { useReducer } from "react";
import InputField from "../../generalcomponent/InputField";
import Button from "../../generalcomponent/Button";

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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in");
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign up page");
  };

  return (
    <div className="login-page">
      <form>
        <InputField
          type="text"
          value={inputLogin.Username}
          onChange={(event) => {
            dispatchInput({
              type: "Username",
              payload: { inputLogin: event.target.value },
            });
          }}
          placeholder="Username"
        ></InputField>
        <InputField
          type="password"
          value={inputLogin.Password}
          onChange={(event) => {
            dispatchInput({
              type: "Password",
              payload: { inputLogin: event.target.value },
            });
          }}
          placeholder="Password"
        />
        <Button onClick={handleLogin} value="Login" />
        <p>Not a member? Sign up here!</p>
        <Button onClick={handleSignUp} value="Sign up" />
      </form>
    </div>
  );
};

export default Login;
