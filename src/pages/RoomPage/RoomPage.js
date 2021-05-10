import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import classes from "./RoomPage.module.css";
import Spinner from "../../components/Spinner/Spinner";

const getRoomInfo = async (RoomId) => {
  const response = await fetch("http://localhost:8080/room/" + RoomId);
  const result = await response.json();
  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(result.room);
    } else {
      reject("something went wrong");
    }
  });
};

function RoomPage(props) {
  const [room, setRoom] = useState(null);
  useEffect(() => {
    const RoomId = props.location.pathname?.split("/")?.pop();
    getRoomInfo(RoomId)
      .then((result) => {
        setRoom(result);
      })
      .catch((er) => console.log(er));
  }, []);
  return (
    <div className={classes.container}>
      {!room && <Spinner />}
      {room && (
        <>
          <div className={classes.imageContainer}>
            <img
              src={"http://localhost:8080/" + room.roomImageUrl}
              alt="room image"
              className={classes.image}
            />
          </div>
          <div className={classes.roomDetails}>
            <Heading title={room.title} />
            <p className={classes.description}>{room.description}</p>
            <p className={classes.roomInfo}>
              <span>No. of Rooms:- </span>
              {room.numberOfRooms}
            </p>
            <p className={classes.roomInfo}>
              <span>address:- </span>
              {room.address}, nainital
            </p>
            <p className={classes.roomInfo}>
              <span>owner name:- </span>
              {room.ownerName}
            </p>
            <p className={classes.roomInfo}>
              <span>owner phone:- </span>+91{room.ownerPhone}
            </p>
            <p className={classes.roomInfo}>
              <span>Rent:- </span>₹ {room.rent}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default RoomPage;
