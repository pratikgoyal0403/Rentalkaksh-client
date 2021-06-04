import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./UserSignup.module.css";
import * as actions from "../../../store/actions/actions";

function UserSignup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const submitHandler = () => {
    // if (
    //   email.trim().length ||
    //   password.trim().length ||
    //   username.trim().length
    // ) {
    //   return toast.warning("Feilds cannot not be empty");
    // }
    props.signup({ email, username, password });
  };
  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.signupContainer}>
          <h1>Signup</h1>
          <TextField
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            required
          />
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Signup
          </Button>
          <p className={classes.specialText}>
            Already have an account? <NavLink to="/user/login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (data) => dispatch(actions.signup(data)),
  };
};

export default connect(null, mapDispatchToProps)(UserSignup);
