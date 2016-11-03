'use strict';

import React, { Component, } from 'react';
import { Container, InputGroup, Content, Col, Row, Input, Grid, Button, Icon, Text } from 'native-base';
import { StatusBar, Alert } from 'react-native';

import routes from './routes';
import Spinner from 'react-native-loading-spinner-overlay';
import myTheme from './themes/theme-auth';

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submit: 'Send email',
            error: false,
            errorMessage: ''
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');
    }
    
    _checkMailAddress(email) {
      var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEx.test(email);
    }
  
    _forgotPassword() {
      if(this.state.email !== null && this.state.email.length !== 0 && this._checkMailAddress(this.state.email)) {
        fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/auth/forgot', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
            })
        }).then( (res) => res.json())
          .then ( (resJson) => {
          if(typeof resJson.error !== 'undefined') {
            // Check return
            this.setState({
              error : true,
              errorMessage : resJson.error
            })
          } else {
            this._showPopUp();
          }
        })
      } else {
        this.setState({
          error : true,
          errorMessage : 'Address email not valid'
        })
      }
    }
  
    _showPopUp() {
      Alert.alert(
        'Forgot Password',
        'Activation link is already send by email',
        [
          {text: 'OK', onPress: () => this.props.navigator.pop()}
        ]
      )
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
                      <Icon name='ios-at-outline' style={{color: 'white'}}/>
                      <Input placeholder='Email' autoCapitalize='none' onChangeText={(email) => this.setState({email})}/>
                    </InputGroup>
                    <Button block bordered style={{marginTop: 25}} onPress={() => this._forgotPassword()}>{this.state.submit}</Button>
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

module.exports = ForgotPass;