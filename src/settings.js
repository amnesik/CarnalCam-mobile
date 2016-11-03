'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, InputGroup, Input, Spinner,Badge, Text } from 'native-base';
import { View } from 'react-native';

import routes from './routes';
import myTheme from './themes/theme-footer';
import myThemeView from './themes/theme-settings';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'nc',
            email: 'nc',
            firstName: 'nc',
            lastName: 'nc',
            pass: null,
            confirmPass: null,
            btnPass: 'Update Password',
            btnProfile: 'Update Profile'
        }
    }
  
    componentDidMount() {
      this.setState({
        username: this.props.currentUser.user.username,
        email: this.props.currentUser.user.email,
        firstName: this.props.currentUser.user.firstName,
        lastName: this.props.currentUser.user.lastName,
      });
    }
    
    _updateProfile() {
      if(this.state.email !== '') {
        this.setState({
          btnProfile: 'Waiting...'
        });
      }
    }
  
    _updatePassword() {
      this.setState({
        btnPass: 'Waiting...'
      });
    }

    render() {     
        return (
          <Container> 
            <Content style={{marginTop: 64}} theme={myThemeView}>
              <List>
                <ListItem itemDivider>
                    <Text>Personnal Information</Text>
                </ListItem>                    
                <ListItem>
                  <InputGroup disabled>
                      <Icon name='ios-person-outline' style={{color: '#1abc9c'}}/>
                      <Input value={this.state.username} onChangeText={(username) => this.setState({username})}/>
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                      <Icon name='ios-at-outline' style={{color: '#1abc9c'}}/>
                      <Input value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                      <Icon name='ios-contact-outline' style={{color: '#1abc9c'}}/>
                      <Input value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})}/>
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                      <Icon name='ios-contact-outline' style={{color: '#1abc9c'}}/>
                      <Input value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
                  </InputGroup>
                </ListItem>
                <ListItem alignItems='center' justifyContent='center'>
                   <Button block bordered onPress={() => {this._updateProfile()}}>{this.state.btnProfile}</Button>
                </ListItem>
                <ListItem itemDivider>
                    <Text>Password</Text>
                </ListItem>
                <ListItem>
                  <InputGroup>
                      <Icon name='ios-unlock' style={{color: '#1abc9c'}}/>
                      <Input placeholder='Password' secureTextEntry={true} onChangeText={(pass) => this.setState({pass})}/>
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                      <Icon name='ios-unlock' style={{color: '#1abc9c'}}/>
                      <Input placeholder='Confirmation password' secureTextEntry={true} onChangeText={(confirmPass) => this.setState({confirmPass})}/>
                  </InputGroup>
                </ListItem>
                <ListItem alignItems='center' justifyContent='center'>
                   <Button block bordered onPress={() => {this._updatePassword()}}>{this.state.btnPass}</Button>
                </ListItem>
              </List> 
            </Content>
            
            <Footer theme={myTheme}>
              <FooterTab>
                <Button onPress={() => {
                        this.props.navigator.replace(routes.groupsRoute())
                      }}>
                  Groups
                  <Icon name='ios-people' />
                </Button>
                <Button onPress={() => {
                        this.props.navigator.replace(routes.cameraRoute())
                      }}>
                  Camera
                  <Icon name='ios-camera' />
                </Button>  
                <Button active>
                  Settings
                  <Icon name='ios-settings' />
                </Button>  
              </FooterTab>
            </Footer>
          </Container>
        );

    }
}

module.exports = Settings;