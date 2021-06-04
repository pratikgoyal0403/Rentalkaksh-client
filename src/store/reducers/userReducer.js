import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

export default function UserReducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: actions.user,
      };
    default:
      return state;
  }
}
