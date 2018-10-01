import {
  ERROR_SET,
  SIGNUP_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  RESET_SUCCESS,
  RESET_FAILURE,
  } from './constants';
  
export const errorSet = (text) => {
  return {
    type: ERROR_SET,
    payload: text
  };
};

export const signupRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const signupFailure = (payload) => ({
  type: SIGNUP_FAILURE,
  payload,
});

export const resetSuccess = (payload) => ({
  type: RESET_SUCCESS,
  payload,
});

export const resetFailure = (payload) => ({
  type: RESET_FAILURE,
  payload,
});









  