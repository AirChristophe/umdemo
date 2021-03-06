import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { AsyncStorage, Image, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { AuthSession, Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';
import { tokenChange } from 'app/screens/App/actions';
import config from 'umdemo/config';
import base64 from 'react-native-base64'



class MyApps extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: false,
            strava: false,
            garmin: false,
            mapMyRun: false,
            fitbit: false,
            polar: false
        };

        this.connectApi = this.connectApi.bind(this);
        this.disconnectApi = this.disconnectApi.bind(this);

        this.connectStrava = this.connectStrava.bind(this);
        this.disconnectStrava = this.disconnectStrava.bind(this);
        this.stravaClientId = 28916;
        this.stravaClientSecret = '4cc3dd3fb46d11e39c82c25860d4869a9f4ca0bf';

        this.connectGarmin = this.connectGarmin.bind(this);
        this.disconnectGarmin = this.disconnectGarmin.bind(this);
        this.garminClientId = 12345; //obtenir un vrai id
        this.garminClientSecret = 'xxxx'; //obtenir une vraie clé

        this.connectMapMyRun = this.connectMapMyRun.bind(this);
        this.disconnectMapMyRun = this.disconnectMapMyRun.bind(this);
        this.mapMyRunClientId = 'od5i5ughrttqz7jzf7w3kzlku5dqn3nw';
        this.mapMyRunClientSecret = 'hqbchss7iut4mvvlhp5g2og3jbzn5xjse3mbdye52dxqmqwxg2gk25xt5i5empkt';

        this.connectFitbit = this.connectFitbit.bind(this);
        this.disconnectFitbit = this.disconnectFitbit.bind(this);
        this.fitbitClientId = '22D5K4'; 
        this.fitbitClientSecret = 'd8ff40394d01c60b538ba92acfbf81b1';

        this.connectPolar = this.connectPolar.bind(this);
        this.disconnectPolar = this.disconnectPolar.bind(this);
        this.polarClientId = 'ff59191d-e07a-457c-9a60-fc6326745a0c'; 
        this.polarClientSecret = '6f114c38-8f4f-4d1c-b82c-ef04682868d8';
    }
    /*
    componentWillMount = async () => {
        const token = await AsyncStorage.getItem('strava');
        this.setState({ strava: token });
    }
    */

    connectGarmin= async() => {
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        const authUrl = `https://www.fitbit.com/oauth2/authorize/` +
        `?client_id=${this.garminClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });

        if (result) {

            console.log("garmin result");
            const tokenUrl = 'https://api.fitbit.com/oauth2/token';
            const params = {
                client_id: this.garminClientId,
                client_secret: this.garminClientSecret,
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

            let responseJson = await result1.json();

            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=${responseJson.access_token}&uid=${responseJson.x_user_id}`;

            const response = await fetch(url);
            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        }
    }

    disconnectGarmin= async(token) => {

    }

    connectPolar = async() => {
        const { auth } = this.props;

        let redirectUrl = AuthSession.getRedirectUrl();
        //let redirectUrl = 'https://auth.expo.io/@georacing/umdemo';
        //let redirectUrl = 'https://expo.io';
        console.log('redirectUrl'); console.log(redirectUrl);

        //https://flow.polar.com/oauth2/authorization?response_type=code&scope={SCOPE}&client_id={CLIENT_ID}&state={STATE}

        const authUrl = `https://flow.polar.com/oauth2/authorization` +
        `?client_id=${this.polarClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` + 
        `&scope=accesslink.read_all`;

        console.log('authUrl'); console.log(authUrl);

        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });

        if (result && result.type != 'cancel') {

            console.log("polar result");
            console.log(result);

            const tokenUrl = 'https://polarremote.com/v2/oauth2/token';

            //const Auth = this.polarClientId + ':' + this.polarClientSecret;
            //const Auth64 = btoa(this.polarClientId + ':' + this.polarClientSecret);
            //const Auth64 = new Buffer(this.polarClientId + ':' + this.polarClientSecret).toString("base64");
            const Auth64 = base64.encode(this.polarClientId + ':' + this.polarClientSecret);

            console.log("Auth2 : " + Auth64);
            console.log("client_id : " + this.polarClientId);
            console.log("code : " + result.params.code);
            console.log("redirect_uri : " + encodeURIComponent(redirectUrl));

            const bodyRequest = 'grant_type=authorization_code&code='+result.params.code+'&redirect_uri='+encodeURIComponent(redirectUrl);
 
            console.log("body : " + bodyRequest);

            let resultPolar = await fetch(
                tokenUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic '+ Auth64,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json;charset=UTF-8'
                    },
                    body: bodyRequest,
                }
            );     

            let responseJson = await resultPolar.json();

            console.log("responseJson");
            console.log(responseJson);

            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=7&t=${responseJson.access_token}&uid=${responseJson.x_user_id}`;

            console.log("url : " + url);

            const response = await fetch(url);

            console.log("response");
            console.log(response);

            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        }
    }

    disconnectPolar= async(token) => {

        const Auth64 = base64.encode(this.polarClientId + ':' + this.polarClientSecret);

        const { auth } = this.props;
            /*const result = await fetch('https://api.fitbit.com/oauth2/revoke', { //todo: à voir si l'addresse fonctionne
                method: 'POST',
                headers: {
                  'Authorization': 'Basic '+AuthBase64,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'token='+token
              }
            );*/
            //if (result) {
                console.log("in disconnectPolar");
                const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=7&t=null&rt=null&uid=null`;
                console.log(url);
                const response = await fetch(url);
                console.log(response);
                if (response) {
                    this.props.onTokenChange(auth.user.uid);
                }
            //}
    }


    connectFitbit= async() => {
        const { auth } = this.props;

        let redirectUrl = AuthSession.getRedirectUrl();
        console.log('redirectUrl'); console.log(redirectUrl);

        //redirectUrl = 'https://player.georacing.com/';
        //https%3A%2F%2Fplayer.georacing.com%2F

        /*const authUrl = `https://www.fitbit.com/oauth2/authorize/` +
        `?client_id=${this.fitbitClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;*/

        const authUrl = `https://www.fitbit.com/oauth2/authorize/` +
        `?client_id=${this.fitbitClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` + 
        `&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight` + 
        `&expires_in=604800`;

        console.log('authUrl'); console.log(authUrl);

        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });

        if (result) {

            console.log("fitbit result");
            console.log(result);

            const tokenUrl = 'https://api.fitbit.com/oauth2/token';

            //const Auth = this.fitbitClientId + ':' + this.fitbitClientSecret;
            const Auth = 'MjJENUs0OmQ4ZmY0MDM5NGQwMWM2MGI1MzhiYTkyYWNmYmY4MWIx';

            console.log("Auth2 : " + Auth);
            console.log("client_id : " + this.fitbitClientId);
            console.log("code : " + result.params.code);
            console.log("redirect_uri : " + encodeURIComponent(redirectUrl));

            const bodyRequest = 'grant_type=authorization_code&client_id='+this.fitbitClientId+'&code='+result.params.code+'&redirect_uri='+encodeURIComponent(redirectUrl)+'&expires_in=604800';
 
            console.log("body : " + bodyRequest);

            let resultFitbit = await fetch(
                tokenUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic '+ Auth,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: bodyRequest,
                }
            );     

            let responseJson = await resultFitbit.json();

            console.log("responseJson");
            console.log(responseJson);

            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=6&t=${responseJson.access_token}&rt=${responseJson.refresh_token}&uid=${responseJson.user_id}`;

            console.log("url : " + url);

            const response = await fetch(url);

            console.log("response");
            console.log(response);

            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        }
    }

    disconnectFitbit= async(token) => {

        const AuthBase64 = 'MjJENUs0OmQ4ZmY0MDM5NGQwMWM2MGI1MzhiYTkyYWNmYmY4MWIx';

        const { auth } = this.props;
            const result = await fetch('https://api.fitbit.com/oauth2/revoke', { //todo: à voir si l'addresse fonctionne
                method: 'POST',
                headers: {
                  'Authorization': 'Basic '+AuthBase64,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'token='+token
              }
            );
            if (result) {
                const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=6&t=null&rt=null&uid=null`;
                console.log(url);
                const response = await fetch(url);
                if (response) {
                    this.props.onTokenChange(auth.user.uid);
                }
            }
    }

    connectMapMyRun = async() => {
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log("mapMyRun redirectUrl: " + redirectUrl);
        const authUrl = `https://api.ua.com/v7.1/oauth2/authorize/` +
        `?client_id=${this.mapMyRunClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });

        if (result) {

            console.log("mapmyrun result");
            console.log(result);

            //const tokenUrl = 'https://oauth2-api.mapmyapi.com/v7.1/oauth2/uacf/access_token/';
            const tokenUrl = 'https://api.ua.com/v7.1/oauth2/access_token/';
            console.log('tokenUrl: ' + tokenUrl);
            const code = result.params.code

            const bodyRequest = 'grant_type=authorization_code&client_id='+this.mapMyRunClientId+'&client_secret='+this.mapMyRunClientSecret+'&code='+code;
            console.log('bodyRequest: ' + bodyRequest);

            /*const params = {
                client_id: this.mapMyRunClientId,
                client_secret: this.mapMyRunClientSecret,
                code: result.params.code
                grant_type: 'client_credentials'
            };*/

            let result1 = await fetch(
                tokenUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: bodyRequest,
                }
            );

            let responseJson = await result1.json();
            console.log("responseJson");
            console.log(responseJson);

            const current_utc_date = new Date().toISOString();
            console.log(current_utc_date);

            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=5&t=${responseJson.access_token}&rt=${responseJson.refresh_token}&d=${current_utc_date}&e=${responseJson.expires_in}`;
            console.log('url: ' + url);

            const response = await fetch(url);
            if (response) {
                console.log("response");
                console.log(response);
                this.props.onTokenChange(auth.user.uid);
            }
        }
    }

    disconnectMapMyRun = async (token) => {
        const { auth } = this.props;
       
        //TODO recup d'une façon où d'une autre le user_id
        /*
        const result = await fetch('https://www.mapmyfitness.com/v7.1/oauth2/connection/' + 
                                    `?user_id=${token}` +
                                    `?client_id=${this.mapMyRunClientId}`, { //todo: à voir si l'addresse fonctionne
            method: 'DELETE'
          }
        );*/

       // if (result) {
            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=5&t=null&uid=null`;
            console.log(url);
            const response = await fetch(url);
            console.log(response);
            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        //}
    }


    connectStrava = async () => {
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        const authUrl = `https://www.strava.com/oauth/authorize` +
        `?client_id=${this.stravaClientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });

        // console.log(22222222);
        // console.log(result);


        if (result) {

            const tokenUrl = 'https://www.strava.com/oauth/token';
            const params = {
                client_id: this.stravaClientId,
                client_secret: this.stravaClientSecret,
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

            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=${responseJson.access_token}`;
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
            const url = `${config.API_URL}/dyn/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=null`;
            console.log(url);
            const response = await fetch(url);
            if (response) {
                this.props.onTokenChange(auth.user.uid);
            }
        }
    }
    
    code() {
        const { strava } = this.state;
        const { fitbit } = this.state;
        const { mapMyRun } = this.state;
        const { polar } = this.state;

        if (strava) {
            console.log(111);
            console.log(strava);
            return `token => ${strava}`;
        }
        if (fitbit) {
            console.log(222);
            console.log(fitbit);
            return `token => ${fitbit}`;
        }
        if (mapMyRun) {
            console.log(333);
            console.log(mapMyRun);
            return `token => ${mapMyRun}`;
        }
        if(polar) {
            console.log(444);
            console.log(polar);
            return `token => ${polar}`;
        }
        console.log(0);
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
            case "2":
                await this.connectGarmin();
              break;
            case "5":
                await this.connectMapMyRun();
              break;
            case "6":
                await this.connectFitbit();
              break;
            case "7":
                await this.connectPolar();
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
            case "3":
                await this.disconnectGarmin(provider.token);
              break;
            case "5":
                await this.disconnectMapMyRun(provider.token);
              break;
            case "6":
                await this.disconnectFitbit(provider.token);
              break;
            case "7":
                await this.disconnectPolar(provider.token);
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

        //console.log(rand);
        //console.log(app);
        
        const { strava, mapMyRun, fitbit, polar, loading } = this.state;

        if (!isNetwork(app.isNetwork)) {
            return <NoNetwork />;
        }

        if (loading) {
            return (
                <View style={styles.root}>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    text="My Applications"
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
                text="My Applications"
            />
            <View style={styles.container}>



                <ScrollView>

                {
                    app.providers.map((provider, index) => {
                        
                        return (
                            <View key={provider.id} style={{display: 'flex',flexDirection: 'row',alignItems: 'center', height: 100,backgroundColor: (index % 2 == 0) ? '#ecf0f1' : '#fff'}}>
                                <View style={styles.left}>
                                    <Image source={{uri: provider.image}} style={styles.image} />
                                    <Text style={styles.text}>{provider.name}</Text>
                                </View>
                                <View style={styles.center}>

                                </View>
                                <View style={styles.right}>
                                    {this.getButton(provider)}
                                </View>                              
                            </View>
                        );
                       
                    })
                }
                </ScrollView>

            </View>   
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      //justifyContent: 'center', 
      alignItems: 'center', //alignement horizontal
      marginTop: Constants.statusBarHeight,
    },
    container: {
      flex: 0,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',

    },
    list: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        //justifyContent: 'flex-start',
        // alignItems: 'left',
        height: 100,
    },
    left: {
       width: 74, 
       justifyContent: 'center',
       alignItems: 'center', 
    },
    center: {
        width:130
    },
    right: {
       //  height: 200, 
    },
    image: {
        width: 60, 
        height: 60
    },
    text: {
        textAlign: 'center',
        //backgroundColor: '#0000ff',
    }
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