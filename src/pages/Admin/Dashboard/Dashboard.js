import React from "react";
import classes from "./Dashboard.module.css";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddNewRoom from "../../../components/AddNewRoom/AddNewRoom";
import DashBoardHome from "../../../components/DashBoardHome/DashBoardHome";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Hamburger from "../../../components/hamburger/Hamburger";
import Backdrop from "../../../components/Backdrop/Backdrop";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Header from "../../../components/Header/Header";

function Dashboard(props) {
  const [currentRoute, setCurrentRoute] = React.useState("dashboard");
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [editItem, setEditingItem] = React.useState(null);

  const setEditItem = (room) => {
    setEditingItem((prevValue) => ({ ...room }));
  };

  React.useEffect(() => {
    if (props.isAdminLogin) {
      return;
    }
    const hasToken = document.cookie.includes("rentalkakshAdmin=");
    if (hasToken) {
      const token = document.cookie
        .split("rentalkakshAdmin=")
        .pop()
        .split(";")
        .shift();
      props.autoLogin(token);
      return;
    }
    props.history.replace("/admin/login");
  }, []);
  const AddNewRoomHandler = async (formdata) => {
    formdata.append("ownerId", props.adminInfo._id);
    props.addNewRoom(formdata);
  };
  return (
    <div className={classes.dashBoardContainer}>
      <Router>
        <Backdrop
          visible={editing || showSideBar}
          setSideBar={setShowSideBar}
          editItem={editItem}
          setEditing={setEditing}
          deleting={deleting}
          setDeleting={setDeleting}
          modal={editing || deleting ? true : false}
        />
        <Hamburger setSideBar={setShowSideBar} sideBar={showSideBar} />
        <aside
          className={
            showSideBar
              ? classes.sideBarContainer
              : [classes.sideBarContainer, classes.hideSideBarContainer].join(
                  " "
                )
          }
        >
          <NavLink
            to="/admin/dashboard"
            className={
              currentRoute === "dashboard"
                ? [classes.navLinkContainer, classes.active].join(" ")
                : classes.navLinkContainer
            }
          >
            <HomeIcon />
            <h1>Home</h1>
          </NavLink>
          <NavLink
            to="/admin/addnewroom"
            className={
              currentRoute === "addnewroom"
                ? [classes.navLinkContainer, classes.active].join(" ")
                : classes.navLinkContainer
            }
          >
            <AddBoxIcon />
            <h1>Add New Room</h1>
          </NavLink>
        </aside>
        {props.isAdminLogin && (
          <main className={classes.mainContainer}>
            {/* main container code */}
            {/* {option === "Home" ? <DashBoardHome /> : <AddNewRoom />} */}
            <Route
              path="/admin/dashboard"
              exact
              render={(props) => (
                <DashBoardHome
                  setCurrentRoute={setCurrentRoute}
                  {...props}
                  setEditing={setEditing}
                  setEditItem={setEditItem}
                  setDeleting={setDeleting}
                />
              )}
            />
            <Route
              path="/admin/addnewroom"
              exact
              render={(props) => (
                <AddNewRoom
                  setCurrentRoute={setCurrentRoute}
                  {...props}
                  AddNewRoom={AddNewRoomHandler}
                />
              )}
            />
          </main>
        )}
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    adminInfo: state.admin.adminInfo,
    isAdminLogin: state.admin.isAdminLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token) => dispatch(actions.autoLogin(token)),
    addNewRoom: (formData) => dispatch(actions.addNewRoom(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
