import React from 'react';
import {
    createDrawerNavigator
} from 'react-navigation';
import Home from 'app/screens/Home';
import MyApps from 'app/screens/MyApps';
import MyActivities from 'app/screens/MyActivities';
import Timeout from 'app/screens/Timeout';
import { Icon } from 'react-native-elements';
import { colors } from 'umdemo/constants';


export default createDrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Home',
            drawerIcon: () => (
              <Icon
                  name='home'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    MyApps: {
        screen: MyApps,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'My Apps',
            drawerIcon: () => (
              <Icon
                  name='ticket'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    MyActivities: {
        screen: MyActivities,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'My Activities',
            drawerIcon: () => (
              <Icon
                  name='file-o'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    Timeout: {
        screen: Timeout,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: ' '
        }),
    },
}, {
    // drawerPosition: 'right',
    // initialRouteName: 'Home',
    initialRouteName: 'Timeout',
});