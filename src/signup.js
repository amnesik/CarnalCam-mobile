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
  DeviceEventEmitter,
} from 'react-native'

import routes from './routes';
import Spinner from 'react-native-loading-spinner-overlay';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
            firstName: '',
            lastName: '',
            submit: 'Sign Up',
            visible: false
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');
    }
  
    _executeQuery() {
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/auth/signup', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: this.state.username,
              password:  this.state.password,
              email: this.state.email,
              firstName:  this.state.firstName,
              lastName: this.state.lastName,
          })
      }).then( (res) => res.json())
        .then( (resJson) => {
            console.log('------- RESPONSE -------' + resJson);
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
                <Row style={{marginTop: 15}}>
                  <Col style={{flex: .3}}></Col>
                  <Col style={{flex: .4}}>
                    <Icon name='ios-camera-outline' style={{fontSize: 200, color: 'white'}}/>
                  </Col>
                  <Col style={{flex: .3}}></Col>
                </Row>
                <Row style={{marginTop: 0}}>
                  <Col style={{flex: .05}}></Col>
                  <Col style={{flex: .9}}>     
                    <InputGroup> 
                      <Icon name='ios-person-outline' style={{color: 'white'}}/>
                      <Input placeholder='Username' autoCapitalize='none' onChangeText={(username) => this.setState({username})}/>
                    </InputGroup>
                    <InputGroup> 
                      <Icon name='ios-at-outline' style={{color: 'white'}}/>
                      <Input placeholder='Email' autoCapitalize='none' onChangeText={(email) => this.setState({email})}/>
                    </InputGroup>
                    <InputGroup> 
                      <Icon name='ios-contact-outline' style={{color: 'white'}}/>
                      <Input placeholder='First Name' autoCapitalize='none' onChangeText={(firstName) => this.setState({firstName})}/>
                    </InputGroup>
                    <InputGroup> 
                      <Icon name='ios-contact-outline' style={{color: 'white'}}/>
                      <Input placeholder='Last Name' autoCapitalize='none' onChangeText={(lastName) => this.setState({lastName})}/>
                    </InputGroup>
                    <InputGroup>
                      <Icon name='ios-unlock-outline' style={{color: 'white'}}/>
                      <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
                    </InputGroup>
                    <InputGroup>
                      <Icon name='ios-unlock-outline' style={{color: 'white'}}/>
                      <Input placeholder='Password confirmation' secureTextEntry={true} onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}/>
                    </InputGroup>
                    <Button block bordered style={{marginTop: 15}} onPress={() => {
                        this.setState({visible : true});
                        this._executeQuery();
                      }}>{this.state.submit}</Button>
                    <Button block transparent small style={{marginTop: 20}} onPress={() => {this.props.navigator.pop()}}> Return to Sign In  </Button>
                  </Col>
                  <Col style={{flex: .05}}></Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        );
    }
}

module.exports = Register;