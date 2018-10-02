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
        this.clientId = 28916;
        this.clientSecret = '4cc3dd3fb46d11e39c82c25860d4869a9f4ca0bf';
        
    }
    /*
    componentWillMount = async () => {
        const token = await AsyncStorage.getItem('strava');
        this.setState({ strava: token });
    }
    */


    connectStrava = async () => {
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        const authUrl = `https://www.strava.com/oauth/authorize` +
        `?client_id=${this.clientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

        // console.log(11111111111);
        // console.log(authUrl);

        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });

        // console.log(22222222);
        // console.log(result);


        if (result) {

            const tokenUrl = 'https://www.strava.com/oauth/token';
            const params = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: result.params.code
            };


            let result1 = await fetch(
                tokenUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                }
            );
            // console.log(222233333);
            // console.log(result1);
            let responseJson = await result1.json();
            // console.log(responseJson);

            // console.log(333333333);
            // console.log(tokenUrl);
            // console.log(responseJson);

            const url = `http://dev-player.georacing.com/dyn/um/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=${responseJson.access_token}`;
            // console.log(url);

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