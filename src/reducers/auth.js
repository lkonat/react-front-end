import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {justSignedEmail:payload.email};
    case USER_LOADED:
    case LOGIN_SUCCESS:
      return {isAuthenticated:true,token:payload.token,user:payload.user,loading:false};
    case AUTH_ERROR:
    case LOGOUT:
      return {
        isAuthenticated: null,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}

export default authReducer;
