import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import { isPortrait } from 'umdemo/utils/platform';
import NoNetwork from 'app/components/NoNetwork';
import { View, StyleSheet, ScrollView, WebView, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';
import config from 'umdemo/config';



class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            datas: false,
            portrait: isPortrait()
        };

         // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
            this.setState({
                portrait: isPortrait()
            });
        });

        
    }

    render() {
        const { app } = this.props;
        const { loading, datas, portrait } = this.state;

        const { navigation } = this.props;
        const activity = navigation.getParam('activity', {});

        console.log(112233);
        console.log(activity);

        if (!isNetwork(app.isNetwork)) {
            return <NoNetwork />;
        }

        if (loading) {
            return (
                <View style={styles.root}>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    text={activity.name}
                />
                <View style={styles.container}>
                    <Loading />
                </View>
                </View>
            );           
        }

       if(portrait)
       { 
         return (
              <View style={styles.root}>
                  <Header
                      onPress={() => this.props.navigation.goBack()}
                      text={activity.name}
                  />
                  <View style={styles.container}>
                      <View style={styles.list}>
                          <Text>{activity.name} - {activity.activity_start_time}</Text>
                          <Text>{config.API_URL +'/map?v=1&id='+activity.id}</Text>  
                      </View>
                      <WebView source={{uri: config.API_URL +'/map?v=1&id='+activity.id}} />
                  </View>   
              </View>
          );
        }else{
          return (
              <View style={styles.root}>
                  <View style={styles.container}>
                      <WebView source={{uri: config.API_URL +'/map?v=1&id='+activity.id}} />
                  </View>   
              </View>
          );
        }
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
      height: '100%',
      width: '100%',
    },
    list: {
        padding: 10,
      }
  });


const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Detail);