import { Button } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import classes from "./Confirm.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

function Confirm({ roomId, setDeleting, setEditing, deletePost }) {
  const cancelDeletion = () => {
    setEditing(false);
    setDeleting(false);
  };
  const deleteRoom = async () => {
    deletePost(roomId);
    setEditing(false);
    setDeleting(false);
  };
  return (
    <div
      className={classes.confirmContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <p>Are you sure? This action cannot be reverted</p>
      <div className={classes.actions}>
        <Button color="primary" variant="contained" onClick={cancelDeletion}>
          cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={deleteRoom}>
          delete
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (roomId) => dispatch(actions.deleteRoom(roomId)),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);
