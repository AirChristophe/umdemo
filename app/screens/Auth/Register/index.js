import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import passwordValidator from 'password-validator';
import { colors } from 'umdemo/constants';
import { loginSuccess, signupFailure } from 'app/screens/Auth/actions';
import ErrorMessage from 'app/screens/Auth/ErrorMessage';
import { Constants } from 'expo';
import Header from 'app/components/Header';
import moment from 'moment';
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

class Register extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          passwordConfirmation: '',
          isEmailValid: true,
          isPasswordValid: true,
          isConfirmationValid: true,
          isLoading: false,
        };
    
        this.register = this.register.bind(this);
    }
  
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    addUser() {
      const user = firebase.auth().currentUser;
      const firestore = firebase.firestore();
      const settings = {
        timestampsInSnapshots: true
      };
      firestore.settings(settings);
      const ref = firestore.collection('users');
      ref.add({
        email: user.email,
        uid: user.uid,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }

    sendEmailVerification() {
      const user = firebase.auth().currentUser;
      user.sendEmailVerification().then(() => {
      }).catch(function(error) {
        console.log(error);
      });
    }

    register() {
        const {
          email,
          password,
          passwordConfirmation,
        } = this.state;
        const { app } = this.props;
        if (!isNetwork(app.isNetwork)) {
          noNetwork();
          return;
        }


        this.setState({ isLoading: true });
    
        if (!this.validateEmail(email)) {
          this.setState({ isLoading: false, isEmailValid: false });
          return;
        }
    
        if (!schema.validate(password)) {
          this.setState({ isLoading: false, isPasswordValid: false });
          return;
        }

        if (password !== passwordConfirmation) {
            this.setState({ isLoading: false, isConfirmationValid: false });
            return;
          }
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.sendEmailVerification(); 
          this.addUser();
          this.props.onLoginUserSuccess(user);
          this.setState({
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
          });
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
          });
          this.props.onSignupUserFailure(error.message);
        });
      }

    render() {
    const {
        isLoading,
        email,
        isEmailValid,
        password,
        isPasswordValid,
        isConfirmationValid,
        passwordConfirmation,
        } = this.state;

        return (
        <View style={styles.root}>
          <Header
            onPress={() => this.props.navigation.goBack()}
            text="S'inscrire"
          />
          <View style={styles.content}>
            <Text style={styles.title}>
              création de compte
            </Text>
            <View>
              <Input
                placeholder='email'
                onSubmitEditing={() => this.passwordInput.focus()}
                onChangeText={email => this.setState({ email })}
                errorMessage={isEmailValid ? null : 'mot de passe invalide'}
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
            <View>
              <Input
                placeholder='repetez mot de passe'
                value={passwordConfirmation}
                keyboardAppearance='light'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
                errorMessage={isConfirmationValid ? null : 'Mot de passe différent'}

              />
            </View>

            <Button
              title='Je crée mon compte' 
              buttonStyle={styles.button}
              onPress={this.register}
              loading={isLoading}
              disabled={isLoading}
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
      backgroundColor: '#f3f3f3',
      // justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      marginTop: 5,
    },
    content: {
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
      onSignupRequest: data => dispatch(signupRequest(data)),
      onLoginUserSuccess: data => dispatch(loginSuccess(data)),
      onSignupUserFailure: msg => dispatch(signupFailure(msg)),
    };
  }
  
  const withConnect = connect(
      mapStateToProps,
      mapDispatchToProps,
    );
  
  export default compose(
      withConnect,
    )(Register);
  