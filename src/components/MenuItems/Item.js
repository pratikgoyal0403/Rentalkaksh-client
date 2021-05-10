import React from "react";
import classes from "./Item.module.css";

function Item(props) {
  return (
    <div
      className={
        props.active
          ? [classes.container, classes.active].join(" ")
          : classes.container
      }
      onClick={props.click}
    >
      {props.children}
    </div>
  );
}

export default Item;
