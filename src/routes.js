'use strict';

import React from 'react';
import People from './people';
import Camera from './camera';
import Settings from './settings';
import Signin from './signin';

import ExNavigator from '@exponent/react-native-navigator';

import {
    View,
    Text,
    Navigator,
} from 'react-native';

const routes = {
  
    reRoutePeople() {
      return {
        getTitle() {
            return '';
        },
        renderScene(navigator) {
            return <ExNavigator
                    navigator={navigator}
                    initialRoute={routes.peopleRoute()}
                    showNavigationBar={true}
                />;
        },
        configureScene() {
            return Navigator.SceneConfigs.FloatFromLeft
        },
      };
    },

    peopleRoute() {
        return {
            getTitle() {
                return 'People';
            },
            renderScene(navigator) {
                return <People navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
            },
        };
    },
  
    cameraRoute() {
        return {
            getTitle() {
                return 'Camera';
            },
            renderScene(navigator) {
                return <Camera navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
            },
        };
    },
  
    settingsRoute() {
        return {
            getTitle() {
                return 'Settings';
            },
            renderScene(navigator) {
                return <Settings navigator={navigator}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.FloatFromLeft
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

}
export default routes;