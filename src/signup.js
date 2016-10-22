'use strict';

import React, { Component, } from 'react';
import { Container, InputGroup, Content, Col, Row, Input, Grid, Button, Icon } from 'native-base';
import { StatusBar, AsyncStorage, Text } from 'react-native'

import routes from './routes';
import Spinner from 'react-native-loading-spinner-overlay';
import myTheme from './themes/theme-auth';

var User = require('./Globals/User');

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
            visible: false,
            error: false,
            errorMessage: '',
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');
    }
  
    _executeQuery() {
      if(this.state.username === '' || this.state.email === '' || this.state.firstName === '' || this.state.lastName === '' || this.state.password === '' || this.state.passwordConfirm === ''){
        this.setState({
          error: true,
          errorMessage: 'All fields are required',
          password: '',
          passwordConfirm: '',
          visible: false
        })
      } else {
        if(this.state.password !== this.state.passwordConfirm){
          this.setState({
            error: true,
            errorMessage: 'Passwords are not identical',
            password: '',
            passwordConfirm: '',
            visible: false
          })
        } else {
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
                try {
                  AsyncStorage.setItem('user',  JSON.stringify(resJson), () => {
                    User.setCurrentUser(resJson);
                    this.props.navigator.replace(routes.reRoutePeople());
                  })
                } catch (error) {
                   console.log('Async Storage Set : ' + error);
                } 
            })
            .catch( (error) => {
              this.setState({
                error: true,
                errorMessage: 'Network failed, server maybe down',
                visible: false
              })
            });
        }
      }
    }
  
    render() {
        if(this.state.error) {
          var baliseError = <Text style={{color: '#ec4363'}}>{this.state.errorMessage}</Text>
        } else {
          var baliseError = null
        }
        return (   
          <Container style={{backgroundColor : '#1abc9c'}}>
            <Content theme={myTheme}>
              <Spinner visible={this.state.visible} />
              <Grid>
                <Row style={{height: 250}}>
                  <Col alignItems='center' justifyContent='center'>
                    <Icon name='ios-camera-outline' style={{fontSize: 200, color: 'white'}}/>
                  </Col>
                </Row>
                <Row size={10}>
                  <Col size={10}></Col>
                  <Col size={80} alignItems='center' justifyContent='center'>
                    {baliseError}
                  </Col>
                  <Col size={10}></Col>
                </Row>  
                <Row size={90} style={{paddingTop: 25, paddingBottom: 50}}>
                  <Col size={10}></Col>
                  <Col size={80}> 
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
                    <Button block bordered style={{marginTop : 25}} onPress={() => {
                        this.setState({
                          visible : true,
                          error: false
                        });
                        this._executeQuery();
                      }}>{this.state.submit}</Button>
                    <Button block transparent small style={{marginTop : 15}} onPress={() => {this.props.navigator.pop()}}> Return to Sign In  </Button>
                  </Col>
                  <Col size={10}></Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        );
    }
}

module.exports = Register;