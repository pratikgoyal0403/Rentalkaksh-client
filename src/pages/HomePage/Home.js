import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import classes from "./Home.module.css";

function Home(props) {
  const inputSubmit = async (inputValue) => {
    const response = await fetch("http://localhost:8080/rooms/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchStr: inputValue }),
    });
    const result = await response.json();
    if (response.status === 200) {
      props.history.push("/result", {
        searchResult: result.searchResult,
        searchStr: inputValue,
      });
    }else{
      toast.error('something went wrong')
    }
  };
  return (
    <div className={classes.homeContainer}>
      <Header />
      <div className={classes.searchContainer}>
        <Heading />
        <Search placeholder="Search for Rooms" submit={inputSubmit} />
        <NavLink to="/allrooms">
          <p className={classes.link}>View All Rooms</p>
        </NavLink>
      </div>
    </div>
  );
}


export default Home;
