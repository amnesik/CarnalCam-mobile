'use strict';

import React, { Component, } from 'react';
import { Container, Header, InputGroup, Content, Col, Row, Input, Grid, Button, Icon } from 'native-base';
import Orientation from 'react-native-orientation';
import myTheme from './themes/theme-auth';
import {
  StatusBar,
  AsyncStorage,
  AppRegistry,
  View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text,
    ActivityIndicator,
} from 'react-native'

import routes from './routes';
import Spinner from 'react-native-loading-spinner-overlay';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            submit: 'Sign In',
            visible: false
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');
    }

    componentDidMount() {
      Orientation.lockToPortrait();
    }
  
    _executeQuery() {
      fetch('http://'+window.SERVER_IP+':'+window.SERVER_PORT+'/auth/signin', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              identifier: this.state.username,
              password:  this.state.password,
          })
      }).then( (res) => res.json())
        .then( (resJson) => {
            console.log('------- RESPONSE -------' + resJson);
            try {
              AsyncStorage.setItem('user_id',  JSON.stringify(resJson.user.id));
              AsyncStorage.setItem('user_token',  JSON.stringify(resJson.token));
              window.CURRENT_USER = JSON.stringify(resJson.user);
              this.props.navigator.replace(routes.reRoutePeople())
            } catch (error) {
               console.log('Async Storage Set : ' + error);
            } 
        })
        .catch( (error) => {
            console.error('------- ERROR -------' + error);
        });
    }
  
    render() {
        return (
          <Container style={{backgroundColor : '#1abc9c'}}>
            <Content theme={myTheme}>
              <Spinner visible={this.state.visible} />
              <Grid>
                <Row style={{marginTop: 75}}>
                  <Col style={{flex: .3}}></Col>
                  <Col style={{flex: .4}}>
                    <Icon name='ios-camera-outline' style={{fontSize: 200, color: 'white', marginBottom: 100}}/>
                  </Col>
                  <Col style={{flex: .3}}></Col>
                </Row>
                <Row style={{marginTop: 90}}>
                  <Col style={{flex: .05}}></Col>
                  <Col style={{flex: .9}}>     
                    <InputGroup> 
                      <Icon name='ios-person' style={{color: 'white'}}/>
                      <Input placeholder='Username' autoCapitalize='none' onChangeText={(username) => this.setState({username})}/>
                    </InputGroup>
                    <InputGroup>
                      <Icon name='ios-unlock' style={{color: 'white'}}/>
                      <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
                    </InputGroup>
                    <Button block bordered style={{marginTop: 15}} onPress={() => {
                        this.setState({visible : true});
                        this._executeQuery();
                      }}>{this.state.submit}</Button>
                    <Button block transparent small style={{marginTop: 20}}> Register </Button>
                    <Button block transparent small> Forgot password ? </Button>
                  </Col>
                  <Col style={{flex: .05}}></Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        );
    }
}

module.exports = Signin;