import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { View, StyleSheet } from 'react-native';
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
            result: false,
        };
        this.connectStrava = this.connectStrava.bind(this);
    }

    connectStrava = async () => {
        console.log(777777);
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log(redirectUrl);
        // alert(redirectUrl);
        console.log(8888888);
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
        this.setState({ result });
    }
    
    code() {
        const { result } = this.state;

        if (result) {
            console.log(111);
            console.log(result);
            console.log(result.params);
            return `token => ${result.params.code}`;
        }
        console.log(222);
        return '';

    }

    render() {
        const { app } = this.props;
        
        const { loading } = this.state;


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

                <Button
                    title='Connect strava' 
                    buttonStyle={styles.strava}
                    onPress={this.connectStrava}
                    containerViewStyle={{width: '100%', marginLeft: 0}}
                    // onPress={() => this.props.navigation.navigate('Reset')}
                />
                <View>
                    <Text>
                        { this.code() }
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
        margin: 20,
        padding: 10, 
    }
  });


const mapStateToProps = state => ({
  app: state.app,
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