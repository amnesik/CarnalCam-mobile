'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Text, InputGroup, Input } from 'native-base';

import routes from './routes';
import myTheme from './themes/theme-footer';
import myThemeView from './themes/theme-settings';

var User = require('./Globals/User');

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'nc',
            email: 'nc',
            firstName: 'nc',
            lastName: 'nc'
        }
        
    }
  
    componentWillMount() {
      const jsonUser = User.getCurrentUser();
      this.setState({
        username: jsonUser.user.username,
        email: jsonUser.user.email,
        firstName: jsonUser.user.firstName,
        lastName: jsonUser.user.lastName,
      })
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
                   <Button block bordered> Update profil </Button>
                </ListItem>
                <ListItem itemDivider>
                    <Text>Availables groups</Text>
                </ListItem>  
              </List> 
            </Content>
            
            <Footer theme={myTheme}>
              <FooterTab>
                <Button onPress={() => {
                        this.props.navigator.replace(routes.peopleRoute())
                      }}>
                  People
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