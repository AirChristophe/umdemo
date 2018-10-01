import {
    STATUS_CHANGE,
    SET_PROVIDERS,
    TOKEN_CHANGE,
  } from './constants';
  
  export const onStatusChange = (payload) => ({
    type: STATUS_CHANGE,
    payload,
  });
  
  export const setProviders = (payload) => ({
    type: SET_PROVIDERS,
    payload,
  });


  export const tokenChange = (payload) => ({
    type: TOKEN_CHANGE,
    payload,
  });