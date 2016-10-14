'use strict';

import React from 'react';
import Home from './home';
import Signin from './signin';

import {
    View,
    Text,
    Navigator,
} from 'react-native';

const routes = {

    homeRoute() {
        return {
            getTitle() {
                return 'Home';
            },
            renderScene(navigator) {
                return <Home navigator={navigator}/>;
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