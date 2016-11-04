'use strict';

import { Icon, Button } from 'native-base';
import { Navigator, Text } from 'react-native';

import React from 'react';
import Groups from './groups';
import Camera from './camera';
import Settings from './settings';
import Signin from './signin';
import Register from './signup';
import ForgotPass from './forgot_password';
import Setup from './setup';
import Logout from './logout'
import Showcam from './showcam';
import Showusrs from './showusrs';
import ShowGrpscam from './groups_cam';
import ShowCamList from './showcams';

import ExNavigator from '@exponent/react-native-navigator';

var User = require('./Globals/User');
var Socket = require('./Globals/socketService');

const routes = {
    reRouteGroups() {
        return {
            getTitle() {
                return '';
            },
            renderScene(navigator) {
                return (
                    <ExNavigator
                        navigator={navigator}
                        initialRoute={routes.groupsRoute()}
                        showNavigationBar={true}
                        navigationBarStyle={{backgroundColor: '#1abc9c'}}
                    />
                );
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
        };
    },

    groupsRoute(user) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Groups</Text>;
            },
            renderScene(navigator) {
                return <Groups navigator={navigator} currentUser={User.getCurrentUser()} socket={Socket.getSocket(User.getCurrentUser().token)}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
        };
    },

    cameraRoute(user) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Camera groups</Text>;
            },
            renderScene(navigator) {
                return <ShowGrpscam navigator={navigator} currentUser={User.getCurrentUser()}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
        };
    },

    settingsRoute(user) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Settings</Text>;
            },
            renderScene(navigator) {
                return <Settings navigator={navigator} currentUser={User.getCurrentUser()}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
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
                return Navigator.SceneConfigs.PushFromRight
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
                return Navigator.SceneConfigs.PushFromRight
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
                return Navigator.SceneConfigs.PushFromRight
            },
        };
    },

    showCamRoute(device) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>{device.name}</Text>;
            },
            renderScene(navigator) {
                return <Showcam navigator={navigator} device={device} currentUser={User.getCurrentUser()} socket={Socket.getSocket(User.getCurrentUser().token)}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
            renderLeftButton(navigator) {
                return (
                    <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => navigator.pop() }>
                        <Icon name='ios-arrow-back' style={{color: 'white'}}/>
                    </Button>
                );
            },
        };
    },
  
    showCamListRoute(deviceGrp) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>{deviceGrp.name}</Text>;
            },
            renderScene(navigator) {
                return <ShowCamList navigator={navigator} deviceGrp={deviceGrp} currentUser={User.getCurrentUser()}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
            renderLeftButton(navigator) {
                return (
                    <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => {navigator.pop();}}>
                        <Icon name='ios-arrow-back' style={{color: 'white'}}/>
                    </Button>
                );
            },
        };
    },
  
    showusrs(group) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>{group.name.toUpperCase()}</Text>;
            },
            renderScene(navigator) {
                return <Showusrs navigator={navigator} group={group} currentUser={User.getCurrentUser()}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
            renderLeftButton(navigator) {
                return (
                    <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => navigator.pop() }>
                        <Icon name='ios-arrow-back' style={{color: 'white'}}/>
                    </Button>
                );
            },
        };
    }

}
export default routes;
