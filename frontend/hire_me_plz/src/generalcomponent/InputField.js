import React, { useState } from "react";

const InputField = (props) => {
  // This is to set the state to be used as value in the input. State is required to allow inputs in the fields
  const [input, setInput] = useState();
  const onChange = (event) => {
    setInput(event.target.value);
  };
  //To input className and placeholder as required. <InputField className="WHAT YOU NEED" placeholder="WHAT YOU NEED"/>
  return (
    <div className={props.className} id={props.id}>
      <input
        value={input}
        onChange={onChange}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};

export default InputField;
