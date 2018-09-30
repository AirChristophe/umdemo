import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Home';
import LoginScreen from './Login';
import ResetScreen from './Reset';
import RegisterScreen from './Register';
import ProfileScreen from './Profile';

const RootStack = createStackNavigator({
    Login: LoginScreen,
    Reset: ResetScreen,
    Register: RegisterScreen,
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}