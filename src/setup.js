'use strict';

import React, { Component } from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Spinner from 'react-native-loading-spinner-overlay';
import routes from './routes';
import { View, AsyncStorage } from 'react-native';
import Orientation from 'react-native-orientation';

window.STORAGE_TOKEN = null;
window.STORAGE_USER_ID = null;
window.SERVER_IP = '178.62.14.241';
window.SERVER_PORT = '1337';
window.CURRENT_USER = null;

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          connected: false,
        };
    } 
      
    componentDidMount() {
      // Lock orientation
      Orientation.lockToPortrait();
      // Get async storage values
      try {
        AsyncStorage.getItem('user_token')
        .then( (value) =>
          {
            window.STORAGE_TOKEN = value
            return AsyncStorage.getItem("user_id")
          }
        )
        .then( (value) =>
          {
            window.STORAGE_USER_ID = value
            // Control values
            console.log('Token : ' + window.STORAGE_TOKEN);
            console.log('User ID : ' + window.STORAGE_USER_ID);

            if(window.STORAGE_TOKEN !== null && window.STORAGE_USER_ID !== null) {
              this.setState({loading: false, connected: true});
            }else{
              this.setState({loading: false, connected: false});
            }
          }
        )
        .done()  
      } catch (error) {
        console.log('Async Storage Get : ' + error);
      }
    }


    render() {
      if (this.state.loading) {
        return(
          <View style={{ flex: 1, backgroundColor : '#1abc9c' }}>
            <Spinner visible={this.state.loading} />
          </View>)
      }
      
      const route = this.state.connected ? routes.reRoutePeople() : routes.signinRoute();
      
      return(
        <ExNavigator
            ref="navigator"
            navigator={navigator}
            initialRoute={route}
            showNavigationBar={false}
        /> 
      );
    }
}

module.exports = Setup;