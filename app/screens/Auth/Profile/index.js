import React from 'react';
import firebase from 'firebase';
import { View, StyleSheet } from 'react-native';
import { Divider, Button, Text } from 'react-native-elements';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { colors } from 'umdemo/constants';
import { logoutSuccess } from 'app/screens/Auth/actions';
import { Constants } from 'expo';
import Header from 'app/components/Header';

class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.onLogoutSuccess();
        firebase.auth().signOut()
        .then(() => {
          // this.props.onLogoutSuccess();
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);

        });
    }

    render() {
        const { auth } = this.props;
      return (
        <View style={styles.root}>
            <Header
                icon="menu"
                onPress={() => this.props.navigation.openDrawer()}
                text="Profile"
            />
            <View style={styles.container}>

                <Divider style={{ backgroundColor: '#f3f3f3', height: 3, margin: 5 }} />
                    
                <View style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 15, marginLeft: 10, color: 'gray'}}>
                            email
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
                        <Text style={{fontSize: 15, marginLeft: 10, color: 'gray'}}>
                            {auth.user.email}
                        </Text>
                    </View>
                </View>


                <View style={{ margin: 30 }}>
                <Button
                    title='Logout' 
                    buttonStyle={styles.button}
                    onPress={this.logout}
                />
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
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: Constants.statusBarHeight,
    },
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
      // justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
    button: {
        margin: 15,
        backgroundColor: colors.main,
        padding: 10,
        width: '100%',
    },

});

const mapStateToProps = state => ({
    auth: state.auth,
});

function mapDispatchToProps(dispatch) {
    return {
        onLogoutSuccess: () => dispatch(logoutSuccess()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

export default compose(
    withConnect,
)(Profile);