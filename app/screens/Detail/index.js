import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { View, StyleSheet, ScrollView, WebView } from 'react-native';
import { Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';

class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            datas: false,
        };
    }

    render() {
        const { app } = this.props;
        const { loading, datas } = this.state;

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
                    text="Detail"
                />
                <View style={styles.container}>
                    <Loading />
                </View>
                </View>
            );           
        }

      return (
        <View style={styles.root}>
            <Header
                onPress={() => this.props.navigation.goBack()}
                text="Detail"
            />
            <View style={styles.container}>
                <View style={styles.list}>
                    <Text>id {activity.id}</Text>
                    <Text>name {activity.name}</Text>
                    <Text>provider_name {activity.provider_name}</Text>
                    <Text>start_time {activity.start_time}</Text>
                                
                </View>
                <WebView
                    source={{uri: 'http://dev-player.georacing.com/dyn/um/map'}}
                    style={{marginTop: 20}}
                />
            </View>   
        </View>
      );
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
      },
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