import axios from "axios";
import React, { useState, useContext } from "react";
import styles from "./parts/modules/chat.module.css";
import Useridcontext from "../../context/userid-context";

const Chat = ({ _id }) => {
  // this page should use the job _id to find the employer id
  // grabbing the employee id from useContext
  //

  // states
  const { userId } = useContext(Useridcontext);
  const [fetchedJobs, setFetchedJobs] = useState("");
  const [employeeid, setEmployeeId] = useState("");
  const [employerid, setEmployerId] = useState("");
  const [jobid, setJobId] = useState("");
  const [Fetchedmessages, setFetchedMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // function to draw chat based on job _id
  const getJobChat = async () => {
    axios.get(`http://127.0.0.1:5000/chat/${jobid}`).then((res) => {
      // Backend Chat Object is created if it doesnt exist.
      setFetchedJobs(res.data);
    });
  };

  const postChatMessage = async () => {
    const body = {
      employeeid: userId,
      employerid,
      jobid,
      newMessage,
    };
    try {
      const endpoint = `http://127.0.0.1:5000/chat/${_id}`;
      const res = await axios.put(endpoint, body);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={styles.chatBox}>
        {fetchedJobs.map((element) => {
          <div>{element.message}</div>;
        })}
      </div>
      <div className={styles.inputMessage}>
        <form type="text"></form>
      </div>
    </div>
  );
};

export default Chat;
