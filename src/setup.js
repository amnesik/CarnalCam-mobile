'use strict';

import React, { Component } from 'react';
import { View, AsyncStorage, StatusBar, Platform } from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import routes from './routes';

var User = require('./Globals/User');

window.SERVER_IP = '178.62.14.241';
//window.SERVER_IP = 'localhost';
window.SERVER_PORT = '1337';

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          connected: false,
        };
        // Change status bar color to white for iOS
        if(Platform.OS === 'ios') {
          StatusBar.setBarStyle('light-content');
        }
    } 
      
    componentDidMount() {
      // Lock orientation
      Orientation.lockToPortrait();
      // Get async storage values
      try {
        AsyncStorage.getItem('user')
        .then( (value) => 
          {           
            console.log('User Async : ' + value);
            if(value !== null) {
              const jsonUser = JSON.parse(value);
              console.log(jsonUser);
              User.setCurrentUser(jsonUser);
              // Control values
              if(jsonUser.user.id !== null && jsonUser.token !== null) {
                this.setState({loading: false, connected: true});
              } else {
                this.setState({loading: false, connected: false});
              }
            } else {
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
      
      const route = this.state.connected ? routes.reRouteGroups() : routes.signinRoute();
      
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