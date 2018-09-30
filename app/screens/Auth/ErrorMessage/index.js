import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { errorSet } from 'app/screens/Auth/actions';
import { colors } from 'umdemo/constants';

class ErrorMessage extends Component {

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.error != ''} 
          onRequestClose={() => {
            this.props.errorSet('');
          }}>
          <View style={{marginTop: 22}}>
            <View style={{padding: 30 }}>
                <Text>{this.props.error}</Text>

                <Button
                    title='Fermer' 
                    buttonStyle={{ backgroundColor: colors.main }}
                    onPress={() => {
                        this.props.errorSet('');
                    }}
                />
            </View>
          </View>
        </Modal>
    );
  }
}


const mapStateToProps = ({ auth }) => {
  const { error } = auth;
  return { error };
};

export default connect(mapStateToProps, {
  errorSet
})(ErrorMessage);
