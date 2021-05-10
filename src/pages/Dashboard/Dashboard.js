import React, { useContext } from "react";
import classes from "./Dashboard.module.css";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddNewRoom from "../../components/AddNewRoom/AddNewRoom";
import DashBoardHome from "../../components/DashBoardHome/DashBoardHome";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Hamburger from "../../components/hamburger/Hamburger";
import Backdrop from "../../components/Backdrop/Backdrop";

const autoLogin = async (token) => {
  const response = await fetch("http://localhost:8080/admin/autoLogin", {
    method: "GET",
    headers: {
      Authorization: "bearer=" + token,
    },
  });
  const result = await response.json();
  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(result.user);
    } else {
      reject("something went wrong");
    }
  });
};

function Dashboard(props) {
  const [currentRoute, setCurrentRoute] = React.useState("dashboard");
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [editItem, setEditingItem] = React.useState(null);
  const { auth, setAuth } = useContext(AuthContext);

  const setEditItem = (room) => {
    setEditingItem((prevValue) => ({ ...room }));
  };

  React.useEffect(() => {
    const token = document.cookie
      ?.split("rentalkakshAdmin=")
      ?.pop()
      ?.split(";")
      ?.shift();
    if (token) {
      autoLogin(token)
        .then((result) =>
          setAuth((preValue) => ({
            username: result.username,
            email: result.email,
            _id: result.userId,
          }))
        )
        .catch((err) => {
          props.history.replace("/admin/login");
        });
      return;
    }
    props.history.replace("/admin/login");
  }, []);
  const AddNewRoomHandler = async (formdata) => {
    const response = await fetch("http://localhost:8080/rooms/newroom", {
      method: "POST",
      body: formdata,
    });
    const result = await response.json();
    return new Promise((resolve, reject) => {
      if (response.status === 201) {
        resolve(result);
      } else {
        reject(response);
      }
    });
  };
  return (
    <div className={classes.dashBoardContainer}>
      <Router>
        <Backdrop
          visible={editing}
          editItem={editItem}
          setEditing={setEditing}
          deleting={deleting}
          setDeleting={setDeleting}
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
        {auth && (
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

export default Dashboard;
