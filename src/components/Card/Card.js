import React from "react";
import Heading from "../Heading/Heading";
import classes from "./Card.module.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router-dom";
function Card({
  admin = false,
  room,
  history,
  setEditing,
  setEditItem,
  setDeleting,
}) {
  return (
    <div
      className={classes.cardContainer}
      onClick={(e) => history.push("/room/" + room._id)}
    >
      <div className={classes.imageContainer}>
        <img
          src={"http://localhost:8080/" + room.roomImageUrl}
          alt={room.title}
          className={classes.image}
        />
      </div>
      <div className={classes.cardContentContainer}>
        <Heading title={room.title} color="black" />
        <p className={classes.location}>
          <LocationOnIcon style={{ color: "tomato" }} />
          <span>{room.address}, </span>
          <span>&nbsp;nainital</span>
        </p>
        <h1 className={classes.price}>₹ {room.rent}</h1>
      </div>
      {/* <div
        className={classes.wishlistContainer}
        onClick={() => setSelection((prevValue) => !prevValue)}
      > */}
      {admin && (
        <div className={classes.wishlistContainer}>
          <IconButton
            className={classes.editIcon}
            onClick={(e) => {
              e.stopPropagation();
              setEditing((prevValue) => true);
              setEditItem(room);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className={classes.deleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              setDeleting(true);
              setEditItem(room);
              setEditing(true);
            }}
          >
            <ClearIcon />
          </IconButton>
        </div>
      )}
      {/* <IconButton
        className={classes.wishlistContainer}
        onClick={() => setSelection((prevValue) => !prevValue)}
      >
        {toggleSelection ? (
          <FavoriteIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton> */}
      {/* </div> */}
    </div>
  );
}

export default withRouter(Card);
