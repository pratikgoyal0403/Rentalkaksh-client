import React, { useState } from "react";
import Form from "../Form/Form";
import classes from "./EditRoom.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

function EditRoom(props) {
  const [loading, setLoading] = useState(false);
  const submit = async (formData) => {
    props.editRoom(formData, props.editItem._id);
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

const mapDispatchToProps = (dispatch) => {
  return {
    editRoom: (formData, roomId) =>
      dispatch(actions.editRoom(formData, roomId)),
  };
};

export default connect(null, mapDispatchToProps)(EditRoom);
