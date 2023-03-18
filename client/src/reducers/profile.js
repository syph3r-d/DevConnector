import { GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE, PROFILE_UPDATED,GET_PROFILES } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

const profile =
  (state = initialState, action)=> {
    const { type, payload } = action;
    switch (type) {
      case PROFILE_UPDATED:
      case GET_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false,
        };
      case GET_PROFILES:
        return{
          ...state,
          profiles:payload,
          loading:false
        }
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          profile: null,
          loading: false,
        };
      case CLEAR_PROFILE:
        return{
          ...state,
          error:{},
          profile:null,
          loading:false,
        }
      default:
        return state;
    }
  };

export default profile;
