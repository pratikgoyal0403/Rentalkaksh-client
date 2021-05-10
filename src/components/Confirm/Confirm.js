import { Button } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import classes from "./Confirm.module.css";

function Confirm({ roomId, setDeleting, setEditing }) {
  const cancelDeletion = () => {
    setEditing(false);
    setDeleting(false);
  };
  const deleteRoom = async () => {
    console.log(roomId);
    const response = await fetch(
      "http://localhost:8080/room/delete/" + roomId,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    if(response.status === 200){
        toast.success('Room deleted')
    }else{
        toast.error('something went wrong')
    }
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

export default Confirm;
