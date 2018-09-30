import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Alert, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Button, Input, Text } from 'react-native-elements';
import Header from 'app/components/Header';
import { colors } from 'umdemo/constants';
import noNetwork from 'umdemo/utils/noNetwork';
import isNetwork from 'umdemo/utils/isNetwork';

class Reset extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmailValid: true,
      isLoading: false,
    };

    this.reset = this.reset.bind(this);
  }

    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    reset() {
      const { app } = this.props;
      if (!isNetwork(app.isNetwork)) {
        noNetwork();
        return;
      }
      const {
        email,
      } = this.state;
      this.setState({ isLoading: true });
      if (!this.validateEmail(email)) {
        this.setState({ isLoading: false, isEmailValid: false });
        return;
      }

      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        this.setState({
          isLoading: false,
        });
        Alert.alert(
          'Mot de passe perdu',
          'Un mail vous a été envoyé',
          [
            {text: 'Ok', onPress: () => this.props.navigation.goBack()},
          ],
          { cancelable: false }
        )
      
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
        this.props.onResetFailure(error.message);
      });


    }
  
    render() {
      const {
        isLoading,
        email,
        isEmailValid,
      } = this.state;
      return (
        <View style={styles.root}>
          <Header
            onPress={() => this.props.navigation.goBack()}
            text="Mot de passe oublié"
          />
          <View style={styles.container}>

          <Text h5>
            Veuillez entrer votre email
          </Text>

            <View style={{ margin: 30, width: '100%' }}>
              <Input
                containerStyle={{ margin: 10 }}
                placeholder='email'
                onChangeText={email => this.setState({ email })}
                errorMessage={isEmailValid ? null : 'email invalide'}
                value={email}
                keyboardAppearance='light'
                autoFocus={false}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
              />
            </View>

            <View style={{ margin: 30 }}>
              <Button
                title='RESET PASSWORD' 
                buttonStyle={styles.button}
                onPress={this.reset}
                loading={isLoading}
                disabled={isLoading}
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
  )(Reset);