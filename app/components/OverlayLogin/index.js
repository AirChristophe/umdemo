import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { colors } from 'umdemo/constants';
import { Constants } from 'expo';
import { withNavigation } from 'react-navigation';


class OverlayLogin extends React.Component  {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Overlay isVisible overlayStyle={styles.overlay} height={250}>
            <Text style={styles.text}>Vous devez être loggué pour acceder a cette page</Text>

            <Button
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Se connecter' 
                onPress={() => this.props.navigation.navigate('Login')}
                containerStyle={styles.containerButton}
            />
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  overlay: {
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    textAlign: 'center',
    margin: 5,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '80%',
  },
  button: {
    margin: 12,
    backgroundColor: colors.main,
    padding: 7,
    width: '100%',
  },
});

export default withNavigation(OverlayLogin);