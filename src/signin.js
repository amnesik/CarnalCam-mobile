'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text,
    ActivityIndicator
} from 'react-native'

import routes from './routes';

var STORAGE_TOKEN = '@AsyncStorageToken:key';
var STORAGE_USER_ID = '@AsyncStorageUserID:key';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
        };
    }

    onUsernameChanged(event) {
        this.setState({ username: event.nativeEvent.text });
        console.log(this.state.username);
    }
    onPasswordChanged(event) {
        this.setState({ password: event.nativeEvent.text });
        console.log(this.state.password);
    }

    _executeQuery() {
        fetch('http://localhost:1337/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: 'carnal',
                password: 'carnal',
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('------- RESPONSE -------'+responseJson.token);
                AsyncStorage.setItem(STORAGE_TOKEN, JSON.stringify(responseJson.token));
                AsyncStorage.setItem(STORAGE_USER_ID, JSON.stringify(responseJson.user.id));
                this.setState({ isLoading: false })
                this.props.navigator.push(routes.homeRoute())
            })
            .catch((error) => {
                console.error('------- ERROR -------'+error);
                this.setState({ isLoading: false })
            });
    }

    render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large'/> ) :
            ( <View/>);
        return (
            <View style={styles.container}>
                <View style={styles.flowRight}>
                    <TextInput
                        onChange={this.onUsernameChanged.bind(this)}
                        style={styles.searchInput}
                        placeholder='Username'/>
                </View>
                <View style={styles.flowRight}>
                    <TextInput
                        onChange={this.onPasswordChanged.bind(this)}
                        style={styles.searchInput}
                        placeholder='Password'/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#99d9f4'
                                    onPress={() => {
                                        this.setState({ isLoading: true })
                                        this._executeQuery()
                                    }}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableHighlight>
                {spinner}
            </View>
        );

    }
}

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    }
});

module.exports = Signin;