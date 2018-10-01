import firebase from 'firebase';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as api from 'umdemo/utils/api';
import { SIGNUP_REQUEST, LOGIN_SUCCESS } from './constants';
import { TOKEN_CHANGE } from '../App/constants';
import { setProviders } from '../App/actions';

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

export function* loginSuccess(action) {
    console.log( 'SAGAS LOGIN SUCCESS' );
    const result = yield call(api.getProviders, action.payload.user.uid);

    yield put(setProviders(result));
}


export function* tokenChange(action) {
    console.log( 'SAGAS TOKEN CHANGE' );
    console.log( action);
    // yield call(delay, 3000);
    const result = yield call(api.getProviders, action.payload);

    yield put(setProviders(result));
}



export default function* watcherSagas() {
  yield takeLatest(SIGNUP_REQUEST, signup);
  yield takeLatest(LOGIN_SUCCESS, loginSuccess);

  yield takeLatest(TOKEN_CHANGE, tokenChange);
  
}
