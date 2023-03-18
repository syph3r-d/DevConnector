import { REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_ERROR,LOGIN_SUCCESS,LOGOUT, ACCOUNT_DELETED } from "../actions/types";

const initial_state = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function auth (state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated:true,
        loading:false,
        user:payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_ERROR:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
