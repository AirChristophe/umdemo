/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React from 'react';
import {
  Text,             // Renders text
  TouchableOpacity, // Pressable container
  View              // Container component
} from 'react-native';

export default class Button extends React.Component  {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
