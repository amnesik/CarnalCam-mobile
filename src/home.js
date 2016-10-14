'use strict';

import React, { Component } from 'react';
import {
    AsyncStorage,
    AppRegistry,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text
} from 'react-native'

import routes from './routes';

var STORAGE_TOKEN = '@AsyncStorageToken:key';
var STORAGE_USER_ID = '@AsyncStorageUserID:key';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            token: '',
        };
    }

    componentDidMount() {
        this._loadInitialState();
    }
    _loadInitialState() {

        AsyncStorage.getItem(STORAGE_TOKEN).then( (token) => {
            if(token !== null) {
                this.setState({ token: token });
                AsyncStorage.getItem(STORAGE_TOKEN).then( (userid) => {
                    if(userid !== null) {
                        this.setState({ userid: userid });
                    }else {
                        this.props.navigator.push(routes.signinRoute())
                    }
                }).done();
            } else {
                this.props.navigator.push(routes.signinRoute())
            }
        }).done();
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    {this.state.userid}
                </Text>
                <Text style={styles.description}>
                    {this.state.token}
                </Text>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>HOME</Text>
                </TouchableHighlight>
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
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
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