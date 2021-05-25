import  { SET_ALERT, REMOVE_ALERT } from './types';
import {v4 as uuidV4} from "uuid";

export const setAlert = (msg,alertype,timeout = 1000)=>dispatch=>{
  const id = uuidV4();
  dispatch({
    type:SET_ALERT,
    payload:{id,msg,alertype}
  });
  setTimeout(()=>{
    dispatch({
      type:REMOVE_ALERT,
      payload:id
    });
  }, timeout);
};
