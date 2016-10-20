'use strict';

import React, { Component } from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Spinner from 'react-native-loading-spinner-overlay';
import routes from './routes';
import { View, AsyncStorage } from 'react-native'

var STORAGE_TOKEN = null;
var STORAGE_USER_ID = null;

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          connected: false,
        };
    }
  
    componentDidMount() {
      // Get async storage values
      try {
        AsyncStorage.getItem('user_token')
        .then( (value) =>
          {
            STORAGE_TOKEN = value
            return AsyncStorage.getItem("user_id")
          }
        )
        .then( (value) =>
          {
            STORAGE_USER_ID = value
            // Control values
            console.log('Token : ' + STORAGE_TOKEN);
            console.log('User ID : ' + STORAGE_USER_ID);

            if(STORAGE_TOKEN !== null && STORAGE_USER_ID !== null) {
              this.setState({loading: false, connected: true});
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
          <View style={{ flex: 1 }}>
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