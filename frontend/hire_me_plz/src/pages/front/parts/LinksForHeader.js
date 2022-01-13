import React from "react";

const LinksForHeader = (props) => {
  return <a href={props.link}>{props.name}</a>;
};

export default LinksForHeader;
