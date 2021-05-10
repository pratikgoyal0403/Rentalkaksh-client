import React, { useState, useRef } from "react";
import classes from "./Form.module.css";
import Heading from "../Heading/Heading";
import { Button, TextField } from "@material-ui/core";

function Form({ title, editItem, loading = false, setLoading, submit }) {
  const [values, setValues] = useState(
    (prevValue) =>
      editItem || {
        title: "",
        description: "",
        numberOfRooms: 1,
        address: "",
        ownerName: "",
        ownerPhone: "",
        rent: "",
      }
  );
  const [image, setimage] = useState(null);
  const ImageRef = useRef(null);
  const createImage = async (file) => {
    const imageFile = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = () => {
      ImageRef.current.src = fileReader.result;
    };
  };
  const imagePicker = async () => {
    try {
      const picker = await window.showOpenFilePicker();
      const file = await picker[0]?.getFile();
      if (file) {
        setimage((prevValue) => file);
        createImage(file);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const submitHandler = () => {
    console.log("submitHandler is working");
    if (
      !(
        image &&
        (image.type === "image/jpeg" ||
          image.type === "image/jpg" ||
          image.type === "image/png")
      ) &&
      !editItem
    ) {
      console.log("this is working");
      return;
    }
    let formdata = new FormData();
    for (let key in values) {
      if (
        !(
          values[key].toString().trim() &&
          values.ownerPhone.toString().trim().length === 10 &&
          values.numberOfRooms <= 5
        )
      ) {
        alert("some values are empty");
        return;
      } else {
        formdata.append(key, values[key]);
      }
    }
    if (image) {
      formdata.append("image", image);
    }
    setLoading(true);
    submit(formdata);
  };
  return (
    <div className={classes.formContainer} onClick={(e) => e.stopPropagation()}>
      <Heading title={title} color="black" />
      <TextField
        label="Room Title"
        required
        value={values.title}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            title: e.target.value,
          }))
        }
      />
      <TextField
        label="Description"
        required
        value={values.description}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            description: e.target.value,
          }))
        }
        multiline
        rowsMax={3}
      />
      <TextField
        //
        label="Number of rooms"
        required
        type="number"
        value={values.numberOfRooms}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            numberOfRooms: +e.target.value,
          }))
        }
        inputProps={{ max: 5, min: 1 }}
      />
      <TextField
        label="Address"
        required
        value={values.address}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            address: e.target.value,
          }))
        }
      />
      <TextField
        label="Owner Name"
        required
        value={values.ownerName}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            ownerName: e.target.value,
          }))
        }
      />
      <TextField
        //
        label="Owner Phone"
        required
        type="number"
        value={values.ownerPhone}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            ownerPhone: e.target.value,
          }))
        }
      />
      <TextField
        //
        label="Rent in ₹"
        required
        type="number"
        value={values.rent}
        onChange={(e) =>
          setValues((prevValue) => ({
            ...prevValue,
            rent: e.target.value,
          }))
        }
      />
      {/* <input
        type="file"
        placeholder="select room image"
        //   onChange={(e) => setimage(e.target.files[0])}
        accept="image/*"
        className={classes.filePickInput}
      /> */}
      {(image || editItem?.roomImageUrl) && (
        <img
          src={"http://localhost:8080/" + editItem?.roomImageUrl}
          className={classes.preview}
          ref={ImageRef}
          alt="preview"
        />
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.imagePicker}
        onClick={imagePicker}
      >
        Add Room Image
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={submitHandler}
        disabled={loading}
      >
        {loading ? "submiting" : "submit"}
      </Button>
    </div>
  );
}

export default Form;
