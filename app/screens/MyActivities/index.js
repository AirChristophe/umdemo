import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'umdemo/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import { View, StyleSheet,Image, ScrollView, TouchableOpacity } from 'react-native';
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

    _onPress(activity) {
        this.props.navigation.navigate('Detail', { activity: activity });
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
                <ScrollView>

                <View style={styles.list}>
                {
                    datas.map((activity, index)  => {
                        return (                          
                            <TouchableOpacity style={{ flex: 1,flexDirection: 'row',padding: 5 ,backgroundColor: (index % 2 == 0) ? '#ecf0f1' : '#fff' }} key={activity.id} onPress={() => this._onPress(activity)}>                                                                
                                  <View style={styles.left}>
                                    <Image source={{uri: activity.provider_image}} style={styles.image} />
                                    <Text style={styles.text}>{activity.provider_name} {index}</Text>
                                  </View>
                                  <View style={styles.right}>
                                    <Text style={styles.text}>{activity.sport_name} : {activity.name} - {activity.activity_start_time}</Text>
                                  </View>                              
                            </TouchableOpacity>
                        );
                    })
                }
                </View>

                </ScrollView>
            </View>   
        </View>
      );
    }
  }

  let colors = ['#123456', '#654321'];

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
      // backgroundColor: 'green',
      //alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
    item: {
        margin: 15,
    },
    list: {
      flex: 1
    },
    line: {
      flex: 1,
      flexDirection: 'row',
      margin: 5,
    },
    image: {
        width: 20, 
        height: 20
    },
    text: {
        textAlign: 'center',
        //backgroundColor: '#0000ff',
    },
    left: {
       width: '15%', 
       justifyContent: 'center',
       alignItems: 'center', 
    },
    right: {
        width:'85%',
        justifyContent: 'center',
       alignItems: 'center',
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
)(MyActivities);