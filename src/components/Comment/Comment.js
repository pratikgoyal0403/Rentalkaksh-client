import React from "react";
import classes from "./Comment.module.css";

const formatDate = (str) => {
  const date = str?.split("T")?.shift();
  return date.split("-").reverse().join("-");
};

function Comment(props) {
  return (
    <div className={classes.container}>
      <span className={classes.abs}></span>
      <div className={classes.userInfo}>
        <p>{props.username}</p>&nbsp; <span>{formatDate(props.date)}</span>
      </div>
      <div className={classes.commentBody}>
        <p>{props.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
