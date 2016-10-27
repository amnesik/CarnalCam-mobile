'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, Spinner, List, ListItem, Text } from 'native-base';

import routes from './routes';
import ExNavigator from '@exponent/react-native-navigator';
import myTheme from './themes/theme-footer';
import myThemeView from './themes/theme-settings';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingUsr: true,
            error: false,
            users: null
        }
    }
  
    componentWillMount() {
      this._getAllUsers();
    } 
  
    _getAllUsers() {
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/User', {
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
            console.log(resJson);
            if(resJson.length !== 0) {
              // Put they groups into var
              this.setState({
                users: resJson,
                loadingUsr: false,
              });
            } else {
              this.setState({
                users: JSON.parse('[{"name" : "No users available"}]'),
                loadingUsr: false,
              }); 
            }
          }  
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    render() {
        var usersContent;
        
        if(this.state.loadingUsr) {
          var usersContent = (<Spinner />);
        } else {
          var usersContent = (
            <List dataArray={this.state.users}
              renderRow={(user) =>
                  <ListItem>
                      <Text style={{color: '#bdc3c7'}}>{user.firstName} {user.lastName.toUpperCase()}</Text>
                  </ListItem>
              }>
            </List>
          );
        }
      
        return ( 
          <Container> 
            <Content style={{marginTop: 64}} theme={myThemeView}>
              <ListItem itemDivider>
                  <Text>Availables users</Text>
              </ListItem> 
              {usersContent}
            </Content> 
            <Footer theme={myTheme}>
              <FooterTab>
                <Button active>
                  People
                  <Icon name='ios-people'/>
                </Button>
                <Button onPress={() => {
                        this.props.navigator.replace(routes.cameraRoute())
                      }}>
                  Camera
                  <Icon name='ios-camera' />
                </Button>  
                <Button onPress={() => {
                        this.props.navigator.replace(routes.settingsRoute())
                      }}>
                  Settings
                  <Icon name='ios-settings' />
                </Button>  
              </FooterTab>
            </Footer>
          </Container>
        );

    }
}

module.exports = People;