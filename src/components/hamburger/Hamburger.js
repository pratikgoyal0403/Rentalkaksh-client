import React from "react";
import classes from "./Hamburger.module.css";

function Hamburger({ setSideBar, sideBar }) {
  return (
    <div
      className={classes.hamburgerContainer}
      onClick={() => setSideBar((prevValue) => !prevValue)}
    >
      <div
        className={
          sideBar ? [classes.line, classes.line1].join(" ") : classes.line
        }
      ></div>
      <div
        className={
          sideBar ? [classes.line, classes.line2].join(" ") : classes.line
        }
      ></div>
      <div
        className={
          sideBar ? [classes.line, classes.line3].join(" ") : classes.line
        }
      ></div>
    </div>
  );
}

export default Hamburger;
