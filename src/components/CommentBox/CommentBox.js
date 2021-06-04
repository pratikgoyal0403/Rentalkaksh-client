import React, { useState } from "react";
import Comment from "../Comment/Comment";
import classes from "./CommentBox.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import Spinner from "../Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

function CommentBox(props) {
  const [commentBody, setCommentBody] = useState("");
  const submitComment = (e) => {
    if (e.key === "Enter") {
      if (!props.isLoggedIn) {
        return toast.error("Login to comment");
      }
      props.newComment(
        {
          comment: commentBody,
          userId: props.userInfo._id,
          username: props.userInfo.username,
        },
        props.roomId
      );
      setCommentBody((prevValue) => "");
    }
  };
  return (
    <div className={classes.commentContainer}>
      <div className={classes.newCommentContainer}>
        <input
          type="text"
          placeholder="Write a Review"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          onKeyUp={submitComment}
        />
      </div>
      <div className={classes.commentsContainer}>
        {props.comments.length > 0 ? (
          props.comments.map((comment) => (
            <Comment {...comment} key={comment._id} />
          ))
        ) : (
          <h2>No Reviews!</h2>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state?.user?.isLoggedIn || state.admin.isAdminLogin,
    userInfo: state?.user?.userInfo || state.admin.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newComment: (data, roomId) => dispatch(actions.newComment(data, roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentBox));
