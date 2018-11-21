import React from 'react';
import { Header } from 'react-native-elements';
import { colors } from 'umdemo/constants';

export default class HeaderComponent extends React.Component  {
  render() {
    return (
        <Header
            leftComponent={{ size: 30, icon: this.props.icon ? this.props.icon : 'keyboard-backspace' , color: '#fff', onPress: this.props.onPress }}
            centerComponent={{ text: this.props.text, style: { color: '#fff' } }}
            statusBarProps={{ barStyle: 'light-content' }}
            outerContainerStyles={{ width: '100%' }}
            innerContainerStyles={{  }}
            backgroundColor={colors.main}
        />
    );
  }
}

