import firebase from 'firebase';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SIGNUP_REQUEST } from './constants';

// import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';


function* firebaseSignup(data) {
  console.log('firebaseSignup');
  console.log(data);
  const { email, password } = data;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log(user);
  });
}

export function* signup(action) {
  console.log('SAGA SIGNUP');
  console.log(action);

  try {
    let user = yield call(firebaseSignup, action.payload);

    // let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    /*
    user.updateProfile({ displayName });
    // write user properties to firebase
    firebase.database().ref(`/users/${user.uid}/userDetails`).set({
      email,
      phone,
      firstname,
      lastname,
      displayName
    });
    */
   console.log(333333);
    console.log(user);
    /*
    loginUserSuccess(dispatch, user);
    dispatch({
      type: ERROR_SET,
      payload: 'Welcome to our Online Shop'
    });
    */
  }
  catch (error) {
    console.log(error);
    // loginUserFail(dispatch);
  }
}

export default function* watcherSagas() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}
