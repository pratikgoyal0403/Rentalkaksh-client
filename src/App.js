import React from "react";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/HomePage/Home";
import RoomPage from "./pages/RoomPage/RoomPage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllRooms from "./pages/AllRooms/AllRooms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomProvider from "./context/RoomContext";
import AuthProvider from "./context/AuthContext";

function App(props) {
  return (
    <AuthProvider>
      <RoomProvider>
        <ToastContainer />
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/result" component={SearchResultPage} />
          <Route path="/room" component={RoomPage} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/allrooms" component={AllRooms} />
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin/addnewroom" component={Dashboard} />
        </Router>
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;
