import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Drawer from 'app/screens/Navigation/Drawer';

import MyApps from 'app/screens/MyApps';
import MyActivities from 'app/screens/MyActivities';

import Login from 'app/screens/Auth/Login';
import Reset from 'app/screens/Auth/Reset';
import Register from 'app/screens/Auth/Register';
import Profile from 'app/screens/Auth/Profile';

import Auth from 'app/screens/Auth';

const RootStack = createStackNavigator(
    {
        Drawer: Drawer,
        MyApps: MyApps,
        MyActivities: MyActivities,
    },
    {
      initialRouteName: 'Drawer',
      headerMode: 'none',
    }
  );


class Stack extends React.Component {

    render() {
        const {
            auth,
          } = this.props;

        if (auth.loginStatus !== 'logged') {
            return (<Auth />);
        }

        return ( <RootStack /> );
    }
}

const mapStateToProps = state => {
    return { ...state
    };
  };
  
  const withConnect = connect(
    mapStateToProps,
    false,
  );
  
  export default compose(
    withConnect,
  )(Stack);