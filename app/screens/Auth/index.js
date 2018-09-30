import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Home';
import LoginScreen from './Login';
import ResetScreen from './Reset';

const RootStack = createStackNavigator({
    Login: LoginScreen,
    Reset: ResetScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}