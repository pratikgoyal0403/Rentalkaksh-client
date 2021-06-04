import React, { useEffect, useRef } from "react";
import Heading from "../../components/Heading/Heading";
import classes from "./RoomPage.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import CommentBox from "../../components/CommentBox/CommentBox";
import Header from "../../components/Header/Header";
import { Button } from "@material-ui/core";

function RoomPage(props) {
  const commentContainer = useRef(null);
  useEffect(() => {
    const RoomId = props.location.pathname?.split("/")?.pop();
    if (RoomId) {
      props.getRoomDetails(RoomId);
    }
  }, []);
  const handleGesture = (e) => {
    // console.log(commentContainer.current.style.top)
    const value = e.nativeEvent.targetTouches[0].clientY;
    const totalHeight = commentContainer.current.clientHeight;
    if (value < 0) {
      return;
    }
    if (totalHeight - (totalHeight * 8) / 100 < value) {
      return;
    }
    commentContainer.current.style.transform = `translateY(${value}px)`;
  };
  const bookingHandler = () => {
    console.log("room booked");
  };
  return (
    <div className={classes.container}>
      {!props.room && <Spinner />}
      {props.room && (
        <>
          <div className={classes.infoContainer}>
            {!props.isLoggedIn && <Header />}
            <div className={classes.imageContainer}>
              <img
                src={"http://localhost:8080/" + props.room.roomImageUrl}
                alt="room image"
                className={classes.image}
              />
            </div>
            <div className={classes.roomDetails}>
              <Heading title={props.room.title} />
              <p className={classes.description}>{props.room.description}</p>
              <p className={classes.roomInfo}>
                <span>No. of Rooms:- </span>
                {props.room.numberOfRooms}
              </p>
              <p className={classes.roomInfo}>
                <span>address:- </span>
                {props.room.address}, nainital
              </p>
              <p className={classes.roomInfo}>
                <span>owner name:- </span>
                {props.room.ownerName}
              </p>
              <p className={classes.roomInfo}>
                <span>owner phone:- </span>+91{props.room.ownerPhone}
              </p>
              <p className={classes.roomInfo}>
                <span>Rent:- </span>₹ {props.room.rent}
              </p>
              <Button
                variant="contained"
                color="primary"
                onClick={bookingHandler}
              >
                Book Now
              </Button>
            </div>
          </div>
          <div
            className={classes.commentContainer}
            // onTouchStart={(e) => console.log(e)}
            onTouchMove={handleGesture}
            ref={commentContainer}
            // onTouchEnd={(e) => console.log(e)}
          >
            <CommentBox
              roomId={props.room._id}
              comments={props.room.comments}
            />
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    room: state.app.currentRoom,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomDetails: (RoomId) => dispatch(actions.getRoomDetails(RoomId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
