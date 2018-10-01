import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';
import * as api from 'umdemo/utils/api';

class MyActivities extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            datas: false,
        };
    }

    componentDidMount = async() => {
        const result = await api.getMyActivities(this.props.auth.user.uid);
        console.log(111);
        console.log(result);
        this.setState({
            datas: result,
            loading: false,
        });
    }

    render() {
        const { app } = this.props;
        const { loading, datas } = this.state;

        if (!isNetwork(app.isNetwork)) {
            return <NoNetwork />;
        }

        if (loading) {
            return (
                <View style={styles.root}>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    text="My Activities"
                />
                <View style={styles.container}>
                    <Loading />
                </View>
                </View>
            );           
        }

        if (!datas) {
            return false;           
        }


      return (
        <View style={styles.root}>
            <Header
                onPress={() => this.props.navigation.goBack()}
                text="My Activities"
            />
            <View style={styles.container}>



            {
                datas.map(activity => {
                    return (
                        <View style={styles.item}>
                            <Text>name: {activity.name}</Text>
                            <Text>start_time: {activity.start_time}</Text>
                        </View>
                    );
                })
            }


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
      backgroundColor: '#f3f3f3',
      alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
    item: {
        margin: 15,
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
)(MyActivities);