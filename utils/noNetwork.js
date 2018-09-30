import { Alert } from 'react-native';

export default noNetwork = () => {
    Alert.alert(
        'Connexion internet recquise',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
}



