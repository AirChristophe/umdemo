import React from 'react';
import {
    compose
  } from 'redux';
import {
    connect
  } from 'react-redux';

import { View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Constants } from 'expo';

class Home extends React.Component {

    render() {

        const {
            auth,
          } = this.props;

    

      return (
        <View style={styles.root}>
            <View style={styles.menu}>
                <Icon
                    style={styles.iconMenu}
                    name='menu'
                    size={30}
                    color="#000000"
                    onPress={() => this.props.navigation.openDrawer()}
                />
            </View>
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}>HOME</Text>
                </View>

            </View>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        // justifyContent: 'center', 
        // alignItems: 'center', 
        marginTop: Constants.statusBarHeight,
      },
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    menu: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        // borderStyle: 'solid',
        // borderColor: 'red',
        // borderWidth: 3,
        maxHeight: 40,
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
    }, 
    title: {
    }, 
});

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
)(Home);
