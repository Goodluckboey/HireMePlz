import React from "react";

const InputField = (props) => {
  //To input className and placeholder as required. <InputField className="WHAT YOU NEED" placeholder="WHAT YOU NEED"/>
  return (
    <div className={props.className} id={props.id}>
      <input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
      ></input>
    </div>
  );
};

export default InputField;
