import React from "react";
import classes from "./Heading.module.css";

function Heading({ title = "RENTALकक्ष", color="rgb(220, 220, 220)" }) {
  return <h1 className={classes.heading} style={{color}}>{title}</h1>;
}

export default Heading;
