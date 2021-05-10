import React from "react";
import Modal from "../Modal/Modal";
import classes from "./Backdrop.module.css";
function Backdrop(props) {
  return (
    <>
      {props.visible && (
        <div
          className={classes.BackdropContainer}
          onClick={(e) => {
            props.setEditing(false);
            props.deleting && props.setDeleting(false);
          }}
        >
          <Modal
            editItem={props.editItem}
            deleting={props.deleting}
            setDeleting={props.setDeleting}
            setEditing={props.setEditing}
          />
        </div>
      )}
    </>
  );
}

export default Backdrop;
