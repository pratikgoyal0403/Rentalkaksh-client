import { toast } from "react-toastify";
import * as actionTypes from "./actionTypes";

// const BASE_URL = 'https://rentalkaksh.herokuapp.com/'
const BASE_URL = "http://localhost:8080/";

export const saveAllRooms = (rooms) => {
  return {
    type: actionTypes.SAVE_ALL_ROOMS,
    rooms,
  };
};
export const getAllRooms = () => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "rooms");
    const result = await response.json();
    if (response.status === 200) {
      dispatch(saveAllRooms(result.rooms));
    }
  };
};

const saveRoomInfo = (room) => {
  return {
    type: actionTypes.GET_ROOM_DETAILS,
    room,
  };
};
export const getRoomDetails = (roomId) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "room/" + roomId);
    const result = await response.json();
    if (response.status === 200) {
      dispatch(saveRoomInfo(result.room));
    } else {
    }
  };
};

const saveNewComment = (comments) => {
  return {
    type: actionTypes.NEW_COMMENT,
    comments,
  };
};

export const newComment = (data, roomId) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "comment/" + roomId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 201) {
      dispatch(saveNewComment(result.comments));
    }
  };
};

//////////////////////////////ADMIN ACTIONS

const saveAdmin = (data) => {
  return {
    type: actionTypes.ADMIN_LOGIN,
    data,
  };
};
export const adminLogin = (formData) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "admin/login", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.status === 200) {
      document.cookie = "rentalkakshAdmin=" + result.token;
      dispatch(saveAdmin(result.user));
      //   toast.success(result.message);
      //   props.history.push("/admin/dashboard");
    } else {
      toast.error(result.message);
    }
  };
};

export const autoLogin = (token) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "admin/autoLogin", {
      method: "GET",
      headers: {
        Authorization: "bearer=" + token,
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      toast.success("user loggin successful");
      dispatch(saveAdmin(result.user));
    } else {
      toast("something went wrong please try logging in again");
    }
  };
};

const saveNewRoom = (room) => {
  return {
    type: actionTypes.ADD_NEW_ROOM,
    room,
  };
};

export const addNewRoom = (formdata) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "rooms/newroom", {
      method: "POST",
      body: formdata,
    });
    const result = await response.json();
    if (response.status === 201) {
      dispatch(saveNewRoom(result.room));
      toast.success(result.message);
    } else {
    }
  };
};

const saveEditedRoom = (room) => {
  return {
    type: actionTypes.EDIT_ROOM,
    room,
  };
};

export const editRoom = (formData, roomId) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "room/editroom/" + roomId, {
      method: "PUT",
      body: formData,
    });
    const result = await response.json();
    if (response.status === 201) {
      toast.success(result.message);
      dispatch(saveEditedRoom(result.room));
    } else {
      toast.error("Something went wrong please try later");
    }
  };
};

const saveDeleteRoom = (room) => {
  return {
    type: actionTypes.DELETE_ROOM,
    room,
  };
};

export const deleteRoom = (roomId) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "room/delete/" + roomId, {
      method: "DELETE",
    });
    const result = await response.json();
    if (response.status === 200) {
      toast.success("Room deleted");
      dispatch(saveDeleteRoom(result.roomId));
    } else {
      toast.error("something went wrong");
    }
  };
};
//////////////////////////////////USER ACTIONS
const saveLogin = (user) => {
  return {
    type: actionTypes.USER_LOGIN,
    user,
  };
};

export const userAutoLogin = (token) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "user/auth", {
      method: "GET",
      headers: {
        Authorization: "bearer=" + token,
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      dispatch(saveLogin(result.user));
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 200) {
      document.cookie = "rentalkaksh=" + result.token;
      toast.success("login successful");
      dispatch(saveLogin(result.user));
    } else {
      toast.error("something went wrong");
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 201) {
      console.log(result);
      toast.success("signup successful please login in");
    }
  };
};
