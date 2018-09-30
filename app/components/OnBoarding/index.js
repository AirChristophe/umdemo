import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from 'umdemo/constants';
import Swiper from './Swiper';


export default class Onboarding extends Component {
  render() {
    return (
      <Swiper onboardingFinish={this.props.onboardingFinish} >
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: colors.main}]}>
          <Icon name="file-o" type="font-awesome" color="#FFFFFF" size={100} />
          <Text style={styles.header}>INFO 1</Text>
          <Text style={styles.text}>description info 1</Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
          <Icon name="medical-bag" type="material-community" color="#FFFFFF" size={100} />
          <Text style={styles.header}>INFO 2</Text>
          <Text style={styles.text}>description info 2</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
          <Icon name="pill" type="material-community" color="#FFFFFF" size={100} />
          <Text style={styles.header}>INFO 2</Text>
          <Text style={styles.text}>description info 3</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});