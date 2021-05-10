import React, { useState } from "react";
import classes from "./AddNewRoom.module.css";
import { toast } from "react-toastify";
import Form from "../Form/Form";

function AddNewRoom({ setCurrentRoute, location: { pathname }, AddNewRoom }) {
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    setCurrentRoute(pathname.split("/").pop());
  }, []);

  const submit = (formData) => {
    AddNewRoom(formData)
      .then((result) => {
        setLoading(false);
        toast.success(result.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("something went wrong");
      });
  };
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

export default AddNewRoom;
