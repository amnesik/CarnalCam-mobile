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
      if (this.state.email !== '') {
        this.setState({
          btnProfile: 'Waiting...'
        });
        fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/User/' + this.props.currentUser.user.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.currentUser.token
          },
          body: JSON.stringify({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
          }),
        }).then((res) => res.json())
          .then((resJson) => {
            // Change all fields
            this.setState({
              btnProfile: 'Profile updated',
              email: resJson.email,
              firstName: resJson.firstName,
              lastName: resJson.lastName
            });
            // Update currentUser informations
            this.props.currentUser.user = resJson;
            setTimeout(() => {
              this.setState({
                btnProfile: 'Update Profile'
              })
            }, 2000);
          })
      }
    }
  
    _updatePassword() {
      console.log(this.state.pass)
      if ((this.state.pass === this.state.confirmPass) && this.state.pass !== null && this.state.pass !== '' && typeof this.state.pass !== 'undefined') {
        this.setState({
          btnPass: 'Waiting...'
        });
        fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/User/' + this.props.currentUser.user.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.currentUser.token
          },
          body: JSON.stringify({
            password: this.state.pass
          }),
        }).then((res) => res.json())
          .then((resJson) => {
            // Change all fields
            this.setState({
              btnPass: 'Password updated',
              pass: null,
              confirmPass: null
            });
            // Update currentUser informations
            this.props.currentUser.user = resJson;
            setTimeout(() => {
              this.setState({
                btnPass: 'Update Password'
              })
            }, 2000);
          })
      } else {
        this.setState({
          btnPass: 'Wrong password',
          password: '',
          passwordConfirm: ''
        });
        // Update btnPass informations
        setTimeout(() => {
          this.setState({
            btnPass: 'Update Password'
          })
        }, 2000);
      }
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
                <Button style={{marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10}} block bordered small onPress={() => {this._updateProfile()}}>{this.state.btnProfile}</Button>
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
                <Button style={{marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10}} block bordered small onPress={() => {this._updatePassword()}}>{this.state.btnPass}</Button>
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