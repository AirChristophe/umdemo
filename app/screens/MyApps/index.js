import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { AuthSession, Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';

class MyApps extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: false,
            strava: false,
        };
        this.connectStrava = this.connectStrava.bind(this);
    }

    connectStrava = async () => {
        const { auth } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        let result = await AuthSession.startAsync({
            authUrl:
            `https://www.strava.com/oauth/authorize` +
            `?client_id=28916` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });
        console.log(result);
        // console.log(JSON.parse(result));
        // console.log(result.params);
        // console.log(result.params.code);
        this.setState({ strava: result });

        try {
            await AsyncStorage.setItem('strava', result.params.code);
        } catch (error) {
            console.log(error);
        }

        console.log(77788999);
        console.log(auth.user.uid);

        const url = `http://dev-player.georacing.com/dyn/um/action.php?Action=SET_TOKEN&id=${auth.user.uid}&p=1&t=${result.params.code}`;
        console.log(url);

        const response = await fetch(url);

    }

    disconnectStrava = async () => {

        const token = await AsyncStorage.getItem('strava');
        await AsyncStorage.removeItem('strava');


        const response = await fetch('https://www.strava.com/oauth/deauthorize', {
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

        this.setState({ strava: false });
    }
    
    code() {
        const { strava } = this.state;

        if (strava) {
            console.log(111);
            console.log(strava);
            console.log(strava.params);
            return `token => ${strava.params.code}`;
        }
        console.log(222);
        return '';

    }

    render() {
        const { app } = this.props;
        
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

                {
                    strava ? 
                    (<View>
                        <Button
                            title='strava connected' 
                            buttonStyle={styles.strava}
                            onPress={this.connectStrava}
                        />
                        <Button
                            title='Disconnect strava' 
                            buttonStyle={styles.strava}
                            onPress={this.disconnectStrava}
                        />                     
                    </View>) :
                    <Button
                        title='Connect strava' 
                        buttonStyle={styles.strava}
                        onPress={this.connectStrava}
                    />

                }

                <View>
                    <Text>
                        { 
                            //this.code() 
                        }
                    </Text>
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
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    strava: {
        backgroundColor: '#ea4a33',
        margin: 10,
        paddingLeft: 50,  
        paddingRight: 50,  
    }
  });


const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(MyApps);