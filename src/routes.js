'use strict';

import React from 'react';
import People from './people';
import Camera from './camera';
import Settings from './settings';
import Signin from './signin';
import Register from './signup';
import ForgotPass from './forgot_password';
import Setup from './setup';
import Logout from './logout'

import ExNavigator from '@exponent/react-native-navigator';
import { Icon, Button } from 'native-base';

import {
    View,
    Text,
    Navigator,
    Alert,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';

const routes = {
    reRoutePeople() {
      return {
        getTitle() {
            return '';
        },
        renderScene(navigator) {
            return (
              <ExNavigator
                  navigator={navigator}
                  initialRoute={routes.peopleRoute()}
                  showNavigationBar={true}
                  navigationBarStyle={{backgroundColor: '#1abc9c'}}
              />
            );
        },
        configureScene() {
            return Navigator.SceneConfigs.FloatFromLeft
        },
      };
    },

    peopleRoute() {
        return {
            getTitle() {
              return <Text style={{color: 'white'}}>People</Text>;
            },
            renderScene(navigator) {
                return <People navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
            },
            renderRightButton(navigator) {
                return (
                  <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => { Logout.logOut(navigator); }}>
                    <Icon name='ios-log-out-outline' style={{color: 'white'}}/>
                  </Button>
                );
            },
        };
    },
  
    cameraRoute() {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Camera</Text>;
            },
            renderScene(navigator) {
                return <Camera navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
            },
            renderRightButton(navigator) {
                return (
                  <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => { Logout.logOut(navigator); }}>
                    <Icon name='ios-log-out-outline' style={{color: 'white'}}/>
                  </Button>
                );
            },
        };
    },
  
    settingsRoute() {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Settings</Text>;;
            },
            renderScene(navigator) {
                return <Settings navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
            },
            renderRightButton(navigator) {
                return (
                  <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => { Logout.logOut(navigator); }}>
                    <Icon name='ios-log-out-outline' style={{color: 'white'}}/>
                  </Button>
                );
            },
        };
    },

    signinRoute() {
        return {
            getTitle() {
                return 'Sign In';
            },
            renderScene(navigator) {
                return <Signin navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
            },
        };
    },
  
    signupRoute() {
      return {
          getTitle() {
              return 'Register';
          },
          renderScene(navigator) {
              return <Register navigator={navigator}/>;
          },
          configureScene() {
              return Navigator.SceneConfigs.FloatFromLeft
          },
      };
    },
  
    forgotPassRoute() {
      return {
          getTitle() {
              return 'Forgot password';
          },
          renderScene(navigator) {
              return <ForgotPass navigator={navigator}/>;
          },
          configureScene() {
              return Navigator.SceneConfigs.FloatFromLeft
          },
      };
    },

}
export default routes;