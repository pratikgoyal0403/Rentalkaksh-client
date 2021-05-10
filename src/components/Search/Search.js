import React from "react";
import classes from "./Search.module.css";
import SearchIcon from "@material-ui/icons/Search";

function Search(props) {
  const [searchInput, setSearchInput] = React.useState(props?.value || "");
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      props.submit(searchInput);
    }
  };
  return (
    <div className={classes.searchContainer}>
      <SearchIcon style={{ color: "rgb(100, 100, 100)" }} />
      <input
        placeholder={props.placeholder}
        className={classes.searchBox}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        onKeyUp={handleSubmit}
      />
    </div>
  );
}

export default Search;
