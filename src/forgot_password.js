'use strict';

import React, { Component, } from 'react';
import { Container, Header, InputGroup, Content, Col, Row, Input, Grid, Button, Icon } from 'native-base';
import myTheme from './themes/theme-auth';
import routes from './routes';
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar } from 'react-native';

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submit: 'Send mail',
            visible: false
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');
        
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
                      <Icon name='ios-at-outline' style={{color: 'white'}}/>
                      <Input placeholder='Email' autoCapitalize='none' onChangeText={(email) => this.setState({email})}/>
                    </InputGroup>
                    <Button block bordered style={{marginTop: 15}} onPress={() => {
                        this.setState({visible : true});
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

module.exports = ForgotPass;