import React from 'react';
import "babel-polyfill";
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { NetInfo } from 'react-native';
import App from 'app/screens/App';

import { onStatusChange  } from 'app/screens/App/actions';

import firebase from 'firebase';
import { firebaseConfig } from 'umdemo/config/auth';
import { loginSuccess  } from 'app/screens/Auth/actions';

const initialState = {};
const store  = configureStore(initialState);

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(' SIGNED !');
    console.log(user);
    // user.sendEmailVerification(); 
    store.dispatch(loginSuccess({user}));
  } else {
    console.log(' NOT SIGNED !');
  }
});
/*
firebase.auth().onAuthStateChanged(function(user) { 
  if (user.emailVerified) {
    console.log('Email is verified');
  }
  else {
    console.log('Email is not verified');
  }
});
*/
NetInfo.getConnectionInfo().then((connectionInfo) => {
  store.dispatch(onStatusChange(connectionInfo.type));
});
function handleFirstConnectivityChange(connectionInfo) {
  store.dispatch(onStatusChange(connectionInfo.type));
}
NetInfo.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

export default class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };

  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


