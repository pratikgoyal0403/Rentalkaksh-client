import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import classes from "./AdminLogin.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
function AdminLogin(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  useEffect(() => {
    if (props.isAdminLogin) {
      return props.history.replace("/admin/dashboard");
    }
    const hasToken = document.cookie.includes("rentalkakshAdmin=");
    if (hasToken) {
      const token = document.cookie
        ?.split("rentalkakshAdmin=")
        ?.pop()
        ?.split(";")
        ?.shift();
      return props.autoLogin(token);
    }
    props.history.replace("/admin/login");
  }, []);
  const submitHandler = async () => {
    if (!email.trim() || !password.trim()) {
      return toast.warning("inputs cannot be empty");
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    props.adminLogin(formData);
  };
  React.useEffect(() => {
    if (props.isAdminLogin) {
      props.history.push("/admin/dashboard");
    } else {
      // toast.error("login error");
    }
  }, [props.isAdminLogin]);
  return (
    <div className={classes.container}>
      <div className={classes.loginContainer}>
        <h1>Admin Login</h1>
        <TextField
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
          rowsMax={5}
        />
        <TextField
          id="standard-basic"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
        />
        <Button variant="contained" color="primary" onClick={submitHandler}>
          Login
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAdminLogin: state.admin.isAdminLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adminLogin: (formData) => dispatch(actions.adminLogin(formData)),
    autoLogin: (token) => dispatch(actions.autoLogin(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
