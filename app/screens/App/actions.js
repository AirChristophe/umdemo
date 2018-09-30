import {
    STATUS_CHANGE,
  } from './constants';
  
  export const onStatusChange = (payload) => ({
    type: STATUS_CHANGE,
    payload,
  });
  