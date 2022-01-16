import React from "react";
import { Link } from "react-router-dom";

const LinksForHeader = (props) => {
  return <Link to={props.link}>{props.name}</Link>;
};

export default LinksForHeader;
