'use strict';

import React, { Component, } from 'react';
import { Container, InputGroup, Content, Col, Row, Input, Grid, Button, Icon } from 'native-base';
import { StatusBar, AsyncStorage, Text } from 'react-native'

import routes from './routes';
import Spinner from 'react-native-loading-spinner-overlay';
import myTheme from './themes/theme-auth';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submit: 'Sign In',
            visible: false,
            error: false,
            errorMessage: ''
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');
        
    }
  
    _executeQuery() {
      if(this.state.username !== '' && this.state.password !== '') {
        fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/auth/signin', {
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
                this.props.navigator.replace(routes.reRoutePeople());
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
      } else {
         this.setState({
            error: true,
            errorMessage: 'Username and Password are required',
            visible: false
          })
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
                      <Icon name='ios-person' style={{color: 'white'}}/>
                      <Input placeholder='Username' autoCapitalize='none' onChangeText={(username) => this.setState({username})}/>
                    </InputGroup>
                    <InputGroup>
                      <Icon name='ios-unlock' style={{color: 'white'}}/>
                      <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
                    </InputGroup>
                    <Button block bordered style={{marginTop: 25}} onPress={() => {
                        this.setState({
                          visible : true,
                          error: false
                        });
                        this._executeQuery();
                      }}>{this.state.submit}</Button>
                    <Button block transparent small style={{marginTop: 15}} onPress={() => {this.props.navigator.push(routes.signupRoute())}}> Register </Button>
                    <Button block transparent small onPress={() => {this.props.navigator.push(routes.forgotPassRoute())}}> Forgot password ? </Button>
                  </Col>
                  <Col size={10}></Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        );
    }
}

module.exports = Signin;