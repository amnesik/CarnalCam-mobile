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
            loadingGrp: true,
            error: false,
            groups: null
        }
    }
  
    componentWillMount() {
      this.setState({
        username: this.props.currentUser.user.username,
        email: this.props.currentUser.user.email,
        firstName: this.props.currentUser.user.firstName,
        lastName: this.props.currentUser.user.lastName,
      });
      this._getUserGroups();
    }
    
    _updateProfil() {
      
    }
  
    _getUserGroups() {
      if(this.state.username !== '' && this.state.password !== '') {
        fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/User/' + this.props.currentUser.user.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.props.currentUser.token
            }
        }).then( (res) => res.json())
          .then( (resJson) => {
            if(resJson !== null) {
              console.log('------- RESPONSE -------');
              console.log('------- GROUPS -------');
              console.log(resJson.groups.length);
              if(resJson.groups.length !== 0) {
                // Put they groups into var
                this.setState({
                  groups: resJson.groups,
                  loadingGrp: false,
                });
              } else {
                this.setState({
                  groups: JSON.parse('[{"name" : "No group available"}]'),
                  loadingGrp: false,
                }); 
              }    
            }  
          })
          .catch( (error) => {
            console.log(error);
          });
      }  
    }

    render() {
        var grpContent;
        
        if(this.state.loadingGrp) {
          var grpContent = (<Spinner />);
        } else {
          var grpContent = (
            <List dataArray={this.state.groups}
              renderRow={(group) =>
                  <ListItem>
                      <Text style={{color: '#bdc3c7'}}>{group.name}</Text>
                      <Badge>0</Badge>
                  </ListItem>
              }>
            </List>
          );
        }
      
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
                    <Text>Availables user groups</Text>
                </ListItem>  
                {grpContent}
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