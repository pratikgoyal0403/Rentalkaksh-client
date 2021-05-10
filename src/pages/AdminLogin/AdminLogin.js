import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import classes from "./AdminLogin.module.css";
function AdminLogin(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setAuth } = useContext(AuthContext);
  const submitHandler = async () => {
    if (!email.trim() || !password.trim()) {
      return toast.warning("inputs cannot be empty");
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await fetch("http://localhost:8080/admin/login", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.status === 200) {
      setAuth(result.user);
      document.cookie = "rentalkakshAdmin=" + result.token;
      toast.success(result.message);
      props.history.push("/admin/dashboard");
    } else {
      toast.error(result.message);
    }
  };
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

export default AdminLogin;
