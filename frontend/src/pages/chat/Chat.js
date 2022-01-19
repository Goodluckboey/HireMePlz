import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import styles from "./parts/modules/chat.module.css";
import Useridcontext from "../../context/userid-context";
import InputField from "../../generalcomponent/InputField";

const Chat = ({ jobid, employeeid, employerid, jobData }) => {
  // this page should use the job _id to find the employer id
  // grabbing the employee id from useContext
  const bringDataDown = useContext(Useridcontext);

  // states
  const [fetchedConvo, setFetchedConvo] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  // const [employeeid, setEmployeeId] = useState("");
  // const [employerid, setEmployerId] = useState("");
  // const [jobid, setJobId] = useState("");
  // const [Fetchedmessages, setFetchedMessages] = useState("");
  // const [newMessage, setNewMessage] = useState("");

  // function to draw chat based on job _id
  const dataToBePassedToBackend = bringDataDown.storageData;
  useEffect(() => {
    const getJobChat = () => {
      axios
        .put(`http://127.0.0.1:5000/newchat`, dataToBePassedToBackend)
        .then((res) => {
          // Backend Chat Object is created if it doesnt exist.
          setFetchedConvo(res.data);
        });
    };
    getJobChat();
  }, []);

  const postChatMessage = (e) => {
    e.preventDefault();
    const inputMessageToSendToBackend = {
      jobid: bringDataDown.storageData.jobid,
      message: inputMessage,
    };
    try {
      axios
        .put("http://127.0.0.1:5000/newmessage", inputMessageToSendToBackend)
        .then(() => {
          axios
            .post("http://127.0.0.1:5000/allmessages", dataToBePassedToBackend)
            .then((res) => {
              setFetchedConvo(res.data);
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const logKeyPresses = (event) => {
    setInputMessage(event.target.value);
  };
  return (
    <div>
      <div className={styles.inputMessage}>
        <form type="text">
          <input
            value={inputMessage}
            type="Text"
            placeholder="Type message here"
            onChange={logKeyPresses}
            className="inputMessage"
          ></input>
          <button onClick={postChatMessage}>PRESS</button>
        </form>
      </div>
      <div>{console.log(fetchedConvo)}</div>
    </div>
  );
};

export default Chat;
