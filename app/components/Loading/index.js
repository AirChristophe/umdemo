import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { Constants } from 'expo';
import { colors } from 'umdemo/constants';

export default class Loading extends React.Component  {
  render() {
    return (
        <View style={styles.root}>
            <ActivityIndicator size="large" color={colors.main}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
});