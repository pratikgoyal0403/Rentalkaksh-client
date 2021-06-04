import React from "react";
import classes from "./Header.module.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
function Header(props) {
  return (
    <div className={classes.headerContainer}>
      {/* <div className={[classes.container, classes.active].join(" ")}>
        <NavLink to="/">Home</NavLink>
      </div> */}
      {!props.isLoggedIn && (
        <>
          <div className={classes.container}>
            <NavLink to="/user/login">Login</NavLink>
          </div>
          <div className={classes.container}>
            <NavLink to="/user/signup">Signup</NavLink>
          </div>
        </>
      )}
      {props.isAdminLogin && (
        <div className={classes.container}>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isAdminLogin: state.admin.isAdminLogin,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
