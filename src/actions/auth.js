import api from "../utils/api.js";
import setAuthToken from "../utils/setAuthToken.js";
import {setAlert} from "../actions/alert.js";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from './types';

export const getAuth = ()=>(dispatch)=>{
  return new Promise(async(resolve, reject)=>{
    try {
        const res = await api.get('/auth');
        console.log("getAuth",res);
        dispatch({
          type: USER_LOADED,
          payload:{token:res.data.token,user:res.data.user}
        });
    } catch (e) {
        dispatch({
          type: AUTH_ERROR
        });
    }
    return resolve();
  });
};

export const logout = ()=>(dispatch)=>{
  return new Promise(async(resolve, reject)=>{
    setAuthToken(false);
    dispatch({
      type: LOGOUT
    });
  });
};
export const logUserIn =({password,email})=>(dispatch)=>{
  return new Promise(async(resolve, reject)=>{
    const body  = {password,email};
    try {
      const res = await api.post('/auth/signin', body);
      console.log("logUserIn",res);
      if(res.data && res.data.token){
        dispatch({
          type:LOGIN_SUCCESS,
          payload:{token:res.data.token,user:res.data.user}
        });
      }else {
        dispatch({
          type:AUTH_ERROR,
          payload:{token:res.data.token,user:res.data.user}
        });
      }
      return resolve(res);
    } catch (err) {
      const error = err.data;
      return resolve({error:error});
    }
  });
};
export const register =({name,password,email,password2})=>(dispatch)=>{
  return new Promise(async(resolve, reject)=>{
    const body  = {name,password,email,password2};
    try {
      const res = await api.post('/auth/signup', body);
      console.log(res,"RES___");
      dispatch({
        type:REGISTER_SUCCESS,
        payload:{email:email}
      });
      return resolve(res);
    } catch (err) {
      const errors = err.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL
      });
      return resolve({error:err});
    }
  });
};
