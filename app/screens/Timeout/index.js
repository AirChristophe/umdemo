import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { colors } from 'umdemo/constants';

class Timeout extends React.Component {

    componentDidMount() {
        this.props.navigation.navigate('Home');
    }

    render() {
      return (
        <SafeAreaView style={{ flex: 1,  flexDirection: 'column', marginTop: 24 }}>


            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text>
                Timeout
                </Text>
            </View>

        </SafeAreaView>
      );
    }
  }


export default Timeout;