import React, { useEffect, useState } from "react";
import classes from "./AddNewRoom.module.css";
import Form from "../Form/Form";
import { connect } from "react-redux";

function AddNewRoom({
  setCurrentRoute,
  location: { pathname },
  AddNewRoom,
  rooms,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCurrentRoute(pathname.split("/").pop());
  }, []);

  const submit = (formData) => {
    setLoading(true);
    AddNewRoom(formData);
  };
  // useEffect(() => {
  //   setLoading(false);
  // }, [rooms.length]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Form
          title="add Room"
          submit={submit}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rooms: state.app.rooms,
  };
};

export default connect(mapStateToProps)(AddNewRoom);
