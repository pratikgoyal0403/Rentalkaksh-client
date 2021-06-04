import React from "react";
import { NavLink } from "react-router-dom";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import Spinner from "../../components/Spinner/Spinner";
import classes from "./SearchResult.module.css";

function SearchResultPage(props) {
  const [searchStr, setSearchStr] = React.useState(
    props.location?.state?.searchStr || ""
  );
  const [searchResult, setSearchResult] = React.useState(
    props.location?.state?.searchResult || "no result found"
  );
  const [loading, setLoading] = React.useState(false);
  const search = async (searchStr) => {
    setLoading((prevValue) => true); //rentalkaksh.herokuapp.com
    const response = await fetch("http://localhost:8080/rooms/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchStr }),
    });
    const result = await response.json();
    if (response.status === 200) {
      setSearchResult(result.searchResult);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Heading />
        </NavLink>
        <Search
          placeholder="Search for Rooms"
          value={searchStr}
          submit={search}
        />
        <div></div>
      </div>
      <div className={classes.mainContainer}>
        {loading && <Spinner />}
        {typeof searchResult === "string" && !loading ? (
          <Heading title={searchResult} />
        ) : (
          searchResult.map((room) => <Card room={room} key={room._id} />)
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;
