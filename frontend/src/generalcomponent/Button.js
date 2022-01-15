import React from "react";

const Button = (props) => {
  // define your function outside of the button to make it work for you
  return (
    <div className={props.className} id={props.id}>
      <button onClick={props.onClick}>{props.value}</button>
    </div>
  );
};

export default Button;
