'use strict';

import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import { Alert, AsyncStorage } from 'react-native';

import Routes from './routes';

const logout = {
  
  logOut(navigator) {
    Alert.alert(
      'Logout',
      'Are you sure to disconnect from this app ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Logout', onPress: () => {
          AsyncStorage.removeItem('user').then(() => {
             navigator.parentNavigator.replace(Routes.signinRoute());
          });
        }, style: 'destructive'},
      ]
    );
  }
}

export default logout;