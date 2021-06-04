import * as actionTypes from "../actions/actionTypes";
const initialState = {
  rooms: null,
  currentRoom: null,
};

export default function AppReducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.GET_ROOM_DETAILS:
      return {
        ...state,
        currentRoom: actions.room,
      };
    case actionTypes.SAVE_ALL_ROOMS:
      return {
        ...state,
        rooms: actions.rooms,
      };
    case actionTypes.ADD_NEW_ROOM:
      return {
        ...state,
        rooms: state.rooms.length
          ? [...state.rooms, actions.room]
          : [actions.room],
      };
    case actionTypes.EDIT_ROOM:
      const rooms = [...state.rooms];
      let index = rooms.findIndex(
        (room) => room._id.toString() === actions.room._id.toString()
      );
      rooms.splice(index, 1, actions.room);
      return {
        ...state,
        rooms: [...rooms],
      };
    case actionTypes.DELETE_ROOM:
      const copyRooms = [...state.rooms];
      let targetIndex = copyRooms.findIndex(
        (room) => room._id === actions.room._id
      );
      copyRooms.splice(targetIndex, 1);
      return {
        ...state,
        rooms: [...copyRooms],
      };
    case actionTypes.NEW_COMMENT:
      const selectedRoom = { ...state.currentRoom };
      selectedRoom.comments = [...actions.comments];
      return {
        ...state,
        currentRoom: { ...selectedRoom },
      };
    default:
      return state;
  }
}
