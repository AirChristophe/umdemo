/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Constants } from 'expo';

export default class NoNetwork extends React.Component  {
  render() {
    return (
      <View style={styles.container}>
        <Overlay isVisible overlayStyle={styles.overlay}>
          <Text style={styles.text}>Pas de connection internet</Text>
          <Text style={styles.text}>Impossible de e connecter au réseau. Merci de bien vouloir réessayer.</Text>
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
  }
});