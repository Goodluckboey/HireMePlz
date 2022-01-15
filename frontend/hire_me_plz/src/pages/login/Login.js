import React, { useContext, useReducer } from "react";
import InputField from "../../generalcomponent/InputField";
import Button from "../../generalcomponent/Button";
import axios from "axios";
import Useridcontext from "../../context/userid-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
      //Using the valid to be true will allow the state to equal to the object unique userId.
      if (res.data.valid !== false) {
        setUserId(res.data._id);
        //Check is already performed by this loop. Will redirect. Check not done in route to next because you need to click the log in button twice
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

  return (
    <div className="login-page">
      <h1>Login</h1>
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
