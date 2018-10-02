import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { AsyncStorage, Image, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { AuthSession, Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';
import { tokenChange } from 'app/screens/App/actions';

class MyApps extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: false,
            strava: false,
        };
        this.connectStrava = this.connectStrava.bind(this);
        this.disconnectApi = this.disconnectApi.bind(this);
        this.connectApi = this.connectApi.bind(this);
        
    }
    /*
    componentWillMount = async () => {
        const token = await AsyncStorage.getItem('strava');
        this.setState({ strava: token });
    }
    */

    connectStrava1 = async () => {
        console.log('connectStrava');
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        const response = await AuthSession.startAsync({
            authUrl:
            `https://www.strava.com/oauth/authorize` +
            `?client_id=28916` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });
        console.log(result);
        const url = `http://dev-player.georacing.com/dyn/um/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=${result.params.code}`;
        console.log(url);
        const response1 = await fetch(url);
        // this.props.onTokenChange(auth.user.uid);

    }

    connectStrava = async () => {
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        const result = await AuthSession.startAsync({
            authUrl:
            `https://www.strava.com/oauth/authorize` +
            `?client_id=28916` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });

        if (result) {
            const url = `http://dev-player.georacing.com/dyn/um/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=${result.params.code}`;
            console.log(url);

            const response = await fetch(url);
            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        }

    }

    disconnectStrava = async (token) => {
        const { auth } = this.props;
        const result = await fetch('https://www.strava.com/oauth/deauthorize', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: token
            })
          }
        );
        if (result) {
            const url = `http://dev-player.georacing.com/dyn/um/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=null`;
            console.log(url);
            const response = await fetch(url);
            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        }
    }
    
    code() {
        const { strava } = this.state;

        if (strava) {
            console.log(111);
            console.log(strava);
            return `token => ${strava}`;
        }
        console.log(222);
        return '';

    }


    connectApi = async (provider) => {
    // connectApi(provider) {
        console.log(77777);
        console.log(provider);
        switch (provider.id) {
            case "1":
                console.log(77);
                await this.connectStrava();
              break;
            default:
              return false;
        }
    }

    disconnectApi = async (provider) => {
    // disconnectApi(provider) {
        console.log(88888);
        console.log(provider);
        switch (provider.id) {
            case "1":
                console.log(88);  
                await this.disconnectStrava(provider.token);
              break;
            default:
              return false;
        }
    }

    getButton(provider) {
        if (!provider.token || provider.token === 'null') {
            // return (<Button title='CONNECT' onPress={this.connectStrava} />);
            return (<Button title='CONNECT' onPress={() => this.connectApi(provider)} />);
        }

        return (<Button buttonStyle={{backgroundColor: '#ea4a33'}} title='DISCONNECT' onPress={() => this.disconnectApi(provider)}  />); 
    }

    render() {
        const { app, rand } = this.props;

        console.log(5555555);
        console.log(rand);
        console.log(app);
        
        const { strava, loading } = this.state;

        if (!isNetwork(app.isNetwork)) {
            return <NoNetwork />;
        }

        if (loading) {
            return (
                <View style={styles.root}>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    text="My Apps"
                />
                <View style={styles.container}>
                    <Loading />
                </View>
                </View>
            );           
        }


      return (
        <View style={styles.root}>
            <Header
                onPress={() => this.props.navigation.goBack()}
                text="My Apps"
            />
            <View style={styles.container}>



                <View>

                {
                    app.providers.map(provider => {
                        return (
                            <View style={styles.list}>
                                <View style={styles.left}>
                                <Image source={{uri: provider.image}}
                                    style={{width: 60, height: 60}} />
                                </View>
                                <View style={styles.right}>
                                    {this.getButton(provider)}
                                    
                                </View>                             
                                
                                
                            </View>
                        );
                    })
                }
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
      flexDirection: 'column',
      backgroundColor: '#f3f3f3',

    },
    list: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start',
        // alignItems: 'left',
        height: 100, 
    },
    left: {
       width: 200, 
    },
    right: {
       //  height: 200, 
    },
  });


const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  rand: state.app.rand,
});

function mapDispatchToProps(dispatch) {
  return {
    onTokenChange: (uid) => dispatch(tokenChange(uid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(MyApps);