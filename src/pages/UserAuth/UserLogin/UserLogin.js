import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./UserLogin.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Spinner from "../../../components/Spinner/Spinner";

function UserLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    // if (email.trim().length || password.trim().length) {
    //   console.log("in if block");
    //   return toast.warning("Feilds cannot be empty");
    // }
    setLoading(true);
    setTimeout(() => {
      props.login({ email, password });
    }, 1500);
  };
  useEffect(() => {
    setLoading(false);
    if (props.isLoggedIn) {
      props.history.push("/");
    }
  }, [props.isLoggedIn]);
  return (
    <div className={classes.container}>
      <div className={classes.loginContainer}>
        <h1>Login</h1>
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
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
          disabled={loading ? true : false}
        >
          {loading ? "loging in..." : "Login"}
        </Button>
        <p className={classes.specialText}>
          Don't have an account? <NavLink to="/user/signup">Signup</NavLink>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(actions.login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
