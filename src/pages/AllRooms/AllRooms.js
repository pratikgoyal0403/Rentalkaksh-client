import classes from "./AllRooms.module.css";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import Header from "../../components/Header/Header";
function AllRooms(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.getAllRooms();
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [props.rooms]);
  return (
    <div className={classes.container}>
      {loading && <Spinner />}
      {props.rooms?.length &&
        props.rooms?.map((room) => <Card room={room} key={room._id} />)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rooms: state.app.rooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRooms: () => dispatch(actions.getAllRooms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRooms);
