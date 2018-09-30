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

class MyApps extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: false,
        };
    }

    render() {
        const { app } = this.props;
        const { loading } = this.state;


        if (!isNetwork(app.isNetwork)) {
            return <NoNetwork />;
        }

        if (loading) {
            return (
                <View style={styles.root}>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    text="My Apps"
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
                text="My Apps"
            />
            <View style={styles.container}>

                <Text>
                aaaaaaaa
                </Text>

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
  });


const mapStateToProps = state => ({
  app: state.app,
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
)(MyApps);