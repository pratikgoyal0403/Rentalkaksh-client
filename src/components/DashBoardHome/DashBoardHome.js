import React, { useEffect } from "react";
import classes from "./DashBoardHome.module.css";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
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
function DashBoardHome({
  setCurrentRoute,
  location: { pathname },
  setEditing,
  setEditItem,
  setDeleting
}) {
  const [rooms, setRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setCurrentRoute(pathname.split("/").pop());
    getRooms()
      .then((result) => {
        setRooms(result.rooms);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.wrapper}>
      {loading && <Spinner />}
      {rooms.length &&
        rooms.map((room) => (
          <Card
            admin={true}
            room={room}
            key={room._id}
            setEditing={setEditing}
            setEditItem={setEditItem}
            setDeleting={setDeleting}
          />
        ))}
    </div>
  );
}

export default DashBoardHome;
