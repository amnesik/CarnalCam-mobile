'use strict';

import React, { Component } from 'react';
import {
    AsyncStorage,
} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import routes from './routes';

var STORAGE_TOKEN = '@AsyncStorageToken:key';

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            message: '',
        };

    }
    componentDidMount() {
        this._loadInitialState();
    }
    _loadInitialState() {

        AsyncStorage.getItem(STORAGE_TOKEN).then( (token) => {
            if(token !== null) {
                this.setState({ token: routes.homeRoute() });
            } else {
                this.setState({ token: routes.signinRoute() });
            }

        }).done();
    }

    render() {
        if(this.state.token !== null){
            return (
                <ExNavigator
                    navigator={navigator}
                    initialRoute={routes.homeRoute()}
                    showNavigationBar={false}
                />
            );
        }else {
            return (
                <ExNavigator
                    navigator={navigator}
                    initialRoute={routes.signinRoute()}
                    showNavigationBar={false}
                />
            );
        }
    }
}

module.exports = Setup;