import classes from "./AllRooms.module.css";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { RoomContext } from "../../context/RoomContext";
import Spinner from "../../components/Spinner/Spinner";
const getRooms = async () => {
  const response = await fetch("http://localhost:8080/rooms");
  const result = await response.json();
  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      return resolve(result);
    } else {
      return reject(result);
    }
  });
};
function AllRooms(props) {
  const [loading, setLoading] = useState(true);
  const { rooms, setRooms } = useContext(RoomContext);
  useEffect(() => {
    getRooms()
      .then((result) => {
        setRooms(result.rooms);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.container}>
      {loading && <Spinner />}
      {rooms.length && rooms.map((room) => <Card room={room} key={room._id} />)}
    </div>
  );
}

export default AllRooms;
