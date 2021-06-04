import React, { useEffect } from "react";
import classes from "./DashBoardHome.module.css";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from '../../store/actions/actions'
// const getRooms = async () => {
//   const response = await fetch("https://rentalkaksh.herokuapp.com/rooms");
//   const result = await response.json();
//   return new Promise((resolve, reject) => {
//     if (response.status === 200) {
//       return resolve(result);
//     } else {
//       return reject(result);
//     }
//   });
// };
function DashBoardHome({
  setCurrentRoute,
  location: { pathname },
  setEditing,
  setEditItem,
  setDeleting,
  rooms,
  getAllRooms
}) {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setCurrentRoute(pathname.split("/").pop());
    if(!rooms) {
      getAllRooms()
    }
  }, []);
  useEffect(()=> {
    if(rooms){
      setLoading(false)
    }
  }, [rooms])
  return (
    <div className={classes.wrapper}>
      {loading && <Spinner />}
      {rooms?.length &&
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

const mapStateToProps = state => {
  return {
    rooms: state.app.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllRooms: () => dispatch(actions.getAllRooms())
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(DashBoardHome);
