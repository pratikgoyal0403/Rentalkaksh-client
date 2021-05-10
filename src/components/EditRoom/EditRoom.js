import React, { useState } from "react";
import { toast } from "react-toastify";
import Form from "../Form/Form";
import classes from "./EditRoom.module.css";

function EditRoom(props) {
  const [loading, setLoading] = useState(false);
  const submit = async (formData) => {
    const response = await fetch(
      "http://localhost:8080/room/editroom/" + props.editItem._id,
      {
        method: "PUT",
        body: formData,
      }
    );
    const result = await response.json();
    if (response.status === 201) {
      toast.success(result.message);
    } else {
      toast.error("Something went wrong please try later");
    }
  };
  return (
    <div className={classes.EditContainer}>
      <Form
        title="Edit Room"
        submit={submit}
        setLoading={setLoading}
        loading={false}
        editItem={props.editItem}
      />
    </div>
  );
}

export default EditRoom;
