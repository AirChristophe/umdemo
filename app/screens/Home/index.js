import React from 'react';
import {
    compose
  } from 'redux';
import {
    connect
  } from 'react-redux';

import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
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
                    <Text style={styles.title}>UM DEMO</Text>
                    <Text style={styles.text}>Centralize all your data in a simple and securized place.</Text>        
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
        flex: 1,
        flexDirection: 'row',        
        maxHeight: 40,
        textAlign: 'center',
    }, 
    text: {
        //flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        backgroundColor: '#014786',
        color: '#ffffff',
        width: '80%',
        padding: 40,
        marginBottom: 100
        // backgroundColor: '#FFFFFF',
    }, 
    image: {

    }, 
    footer: {
        flex: 1,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        justifyContent: 'center', 
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    footerText: {
        margin: 10
    },
    footerImage: {
        resizeMode: 'contain',
        margin: 10,
        width: 100,
        height: 20
    }
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
