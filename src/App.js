import React, { useEffect } from "react";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Home from "./pages/HomePage/Home";
import RoomPage from "./pages/RoomPage/RoomPage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllRooms from "./pages/AllRooms/AllRooms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSignup from "./pages/UserAuth/UserSignup/UserSignup";
import UserLogin from "./pages/UserAuth/UserLogin/UserLogin";
import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

function App(props) {
  useEffect(() => {
    const hasToken = document.cookie.includes("rentalkaksh=");
    const hasAdminToken = document.cookie.includes("rentalkakshAdmin=");
    if (hasToken && !hasAdminToken) {
      const token = document.cookie
        .split("rentalkaksh=")
        .pop()
        ?.split(";")
        ?.shift();
      return props.autoLogin(token);
    }
  }, []);
  return (
    <>
      <ToastContainer newestOnTop={true} />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/result" component={SearchResultPage} />
        <Route path="/room" component={RoomPage} />
        <Route path="/admin/login" exact component={AdminLogin} />
        <Route path="/allrooms" component={AllRooms} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/addnewroom" component={Dashboard} />
        <Route path="/user/login" component={UserLogin} />
        <Route path="/user/signup" component={UserSignup} />
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token) => dispatch(actions.userAutoLogin(token)),
  };
};

export default connect(null, mapDispatchToProps)(App);
