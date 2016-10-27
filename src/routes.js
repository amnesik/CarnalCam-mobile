'use strict';

import { Icon, Button } from 'native-base';
import { Navigator, Text } from 'react-native';

import React from 'react';
import People from './people';
import Camera from './camera';
import Settings from './settings';
import Signin from './signin';
import Register from './signup';
import ForgotPass from './forgot_password';
import Setup from './setup';
import Logout from './logout'
import Showcam from './showcam';
import Showgrps from './showgrps';

import ExNavigator from '@exponent/react-native-navigator';

var User = require('./Globals/User');
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
                return Navigator.SceneConfigs.PushFromRight
            },
        };
    },

    peopleRoute(user) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>People</Text>;
            },
            renderScene(navigator) {
                return <People navigator={navigator} currentUser={User.getCurrentUser()}/>;
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

    cameraRoute(user) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Camera</Text>;
            },
            renderScene(navigator) {
                return <Camera navigator={navigator} currentUser={User.getCurrentUser()}/>;
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

    showcamRoute(user) {
        var ws = new WebSocket('ws://'+window.SERVER_IP +':'+ window.SERVER_PORT+'/path/'+User.getCurrentUser().user.id);
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>Show</Text>;
            },
            renderScene(navigator) {
                return <Showcam navigator={navigator} currentUser={User.getCurrentUser()}/>;
            },
            configureScene() {
                return Navigator.SceneConfigs.PushFromRight
            },
            renderLeftButton(navigator) {
                return (
                    <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => {navigator.pop();
                        ws.onclose = (e) => {
                            ws.send('User : '+this.props.currentUser.user.id+ ': quit camera :');
                            console.log(e.code, e.reason);
                        };
                    }}>
                        <Icon name='ios-arrow-back' style={{color: 'white'}}/>
                    </Button>
                );
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
  
    showgrps(user) {
        return {
            getTitle() {
                return <Text style={{color: 'white'}}>{user.username}</Text>;
            },
            renderScene(navigator) {
                return <Showgrps navigator={navigator} user={user}/>;
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
            renderRightButton(navigator) {
                return (
                    <Button transparent style={{marginRight: 10, marginTop: 5}} onPress={() => { Logout.logOut(navigator); }}>
                        <Icon name='ios-log-out-outline' style={{color: 'white'}}/>
                    </Button>
                );
            },
        };
    }

}
export default routes;