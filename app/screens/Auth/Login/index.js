import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Header, Input, Divider } from 'react-native-elements';
import passwordValidator from 'password-validator';
import { colors } from 'umdemo/constants';
import { loginSuccess, loginFailure } from 'app/screens/Auth/actions';
import ErrorMessage from 'app/screens/Auth/ErrorMessage';
import { Constants } from 'expo';
import noNetwork from 'umdemo/utils/noNetwork';
import isNetwork from 'umdemo/utils/isNetwork';

const schema = new passwordValidator();
/*
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);
*/

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
      isLoading: false,
    };

    this.login = this.login.bind(this);
  }


  componentWillMount() {
    if (this.props.auth.loginStatus === 'logged') {
      this.props.navigation.navigate('Profile');
    }   
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  login() {
    const { app } = this.props;
    if (!isNetwork(app.isNetwork)) {
      noNetwork();
      return;
    }
 
    const {
      email,
      password,
    } = this.state;
    this.setState({ isLoading: true });

    if (!this.validateEmail(email)) {
      this.setState({ isLoading: false, isEmailValid: false });
      return;
    }

    if (!schema.validate(password)) {
      this.setState({ isLoading: false, isPasswordValid: false });
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(777);
      console.log(user);
      this.setState({
        isLoading: false,
        isEmailValid: true,
        isPasswordValid: true,
      });
      this.props.onLoginUserSuccess(user);
      // this.props.navigation.goBack();
      console.log(888);
      console.log(this.props.navigation);
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        isLoading: false,
        isEmailValid: true,
        isPasswordValid: true,
      });
      this.props.onLoginUserFailure(error.message);
    });
  }
  
  render() {
    const {
      isLoading,
      email,
      isEmailValid,
      password,
      isPasswordValid,
    } = this.state;

    return (
      <View style={styles.root}>
            <Header
                leftComponent={{  }}
                centerComponent={{ text: 'Authentification', style: { color: '#fff' } }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{ width: '100%'  }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

          <View style={styles.container}>
          <Text style={styles.title}>
            J'ai déjà un compte
          </Text>
          <View>
            <Input
              placeholder='email'
              onSubmitEditing={() => this.passwordInput.focus()}
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
          <View>
            <Input
              placeholder='mot de passe'
              value={password}
              keyboardAppearance='light'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType="done"
              blurOnSubmit={true}
              onChangeText={(password) => this.setState({password})}
              errorMessage={isPasswordValid ? null : 'Please enter at least 8 characters'}

            />
            <Text style={styles.passwordRule}>
              mot de passe doit comprendre au moins une minuscule, une majuscule, un chiffre, une lettre
            </Text>
          </View>
          <View style={styles.actions}>
            <View style={styles.reset}>
              <Button
                  title='mot de passe oublié?' 
                  buttonStyle={styles.button1}
                  titleStyle={{ fontSize: 13 }}
                  onPress={() => this.props.navigation.navigate('Reset')}
                />
              </View>
            <View style={styles.login}>
              <Button
                title='login' 
                buttonStyle={styles.button}
                loading={isLoading}
                disabled={isLoading}
                onPress={this.login}
              />
            </View>
          </View>
          <Divider style={{ backgroundColor: '#f3f3f3', height: 3, margin: 5 }} />
          <Text style={styles.title}>
            Pas encore de compte ?
          </Text>
          <Button
            title='Je crée mon compte' 
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate('Register')}
            // onPress={() => this.props.navigation.navigate('Reset')}
          />
        </View>
        <ErrorMessage />
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
      backgroundColor: '#FFFFFF',
      borderStyle: 'solid',
      borderColor: '#F5F5F5',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 7,
      // minHeight: 400,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      marginTop: 5,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reset: {
      flex: 1,
    },
    login: {
      flex: 1,
    },
    content2: {
      maxHeight: 120,
    },
    button: {
      marginTop: 15,
      marginBottom: 15, 
      marginLeft: 5, 
      marginRight: 5, 
      backgroundColor: colors.main,
    },
    button1: {
      marginTop: 15,
      marginBottom: 15, 
      marginLeft: 5, 
      marginRight: 5, 
      backgroundColor: '#ffc300',
    },
    passwordRule: {
      color: '#CCCCCC',
      fontSize: 11,
    }
});

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginUserSuccess: data => dispatch(loginSuccess(data)),
    onLoginUserFailure: msg => dispatch(loginFailure(msg)), 
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Login);
