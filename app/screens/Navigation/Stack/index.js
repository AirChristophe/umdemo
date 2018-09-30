import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Drawer from 'app/screens/Navigation/Drawer';

import MyApps from 'app/screens/MyApps';
import MyActivities from 'app/screens/MyActivities';


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