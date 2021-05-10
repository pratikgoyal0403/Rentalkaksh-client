import React from "react";
import Confirm from "../Confirm/Confirm";
import EditRoom from "../EditRoom/EditRoom";
import classes from "./Modal.module.css";

function Modal({ editItem, deleting, setDeleting, setEditing }) {
  return (
    <div className={classes.modalContainer}>
      {!deleting ? (
        <EditRoom editItem={editItem} />
      ) : (
        <Confirm
          setDeleting={setDeleting}
          setEditing={setEditing}
          roomId={editItem._id}
        />
      )}
    </div>
  );
}

export default Modal;
