import * as actionType from "../actions/actionTypes";

const initialState = {
  adminInfo: null,
  isAdminLogin: false,
};

export default function AdminAuthReducer(state = initialState, actions) {
  switch (actions.type) {
    case actionType.ADMIN_LOGIN:
      return {
        ...state,
        adminInfo: actions.data,
        isAdminLogin: true,
      };
    default:
      return state;
  }
}
