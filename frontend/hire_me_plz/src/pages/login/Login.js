import React, { useContext, useReducer } from "react";
import InputField from "../../generalcomponent/InputField";
import Button from "../../generalcomponent/Button";
import axios from "axios";
import Useridcontext from "../../context/userid-context";

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

  //call the set function for useId and to be updated if there is a match
  const callAndSetUserId = useContext(Useridcontext);
  const setUserId = callAndSetUserId.setUserId;
  // call the userId state in app
  const userId = callAndSetUserId.userId;

  //function to compare username to get the userid
  const retriveUserNameToRetriveUserId = () => {
    axios.post("http://localhost:5000/login").then((res) => {
      if (res.data.username === inputLogin.Username) {
        setUserId(res.data._id);
        //redirect page link="http://localhost:5000/marketplace"
      } else {
        alert("Wrong UserName or Password");
      }
    });
  };
  //  useEffect(()=>{retriveUserNameToRetriveUserId},[handleLogin])

  const handleLogin = (e) => {
    e.preventDefault();
    retriveUserNameToRetriveUserId();
    console.log("Logged in");
  };
  // const retriveProfileData = () => {
  //   axios.get(`http://localhost:5000/profile/${userId}`).then((res) => {
  //     setProfileData(res.data);
  //   });
  // };
  // useEffect(() => {
  //   retriveProfileData();
  // }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Link to sign up page");
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
