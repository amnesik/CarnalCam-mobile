'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, Spinner, List, ListItem, Text, Badge } from 'native-base';

import routes from './routes';
import ExNavigator from '@exponent/react-native-navigator';
import myTheme from './themes/theme-footer';
import myThemeView from './themes/theme-people';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingGrps: true,
            error: false,
            groups: null
        }
    }
  
    componentDidMount() {
      this._getAllGroups();
    } 
  
    _getAllGroups() {
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/UserGroup', {
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
                groups: resJson,
                loadingGrps: false,
              });
            } else {
              this.setState({
                groups: JSON.parse('[{"name" : "No users available"}]'),
                loadingGrps: false,
              }); 
            }
          }  
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    render() {
        var grpsContent;
        
        if(this.state.loadingGrps) {
          var grpsContent = (<Spinner />);
        } else {
          var grpsContent = (
            <List dataArray={this.state.groups}
              renderRow={(group) =>
                  <ListItem onPress={() => {
                    this.props.navigator.push(routes.showusrs(group))
                  }}>
                      <Text style={{color: '#bdc3c7'}}>{group.name}</Text>
                      <Badge>{group.members.length}</Badge>
                  </ListItem>
              }>
            </List>
          );
        }
      
        return ( 
          <Container> 
            <Content style={{marginTop: 64}} theme={myThemeView}>
              <ListItem itemDivider>
                  <Text>Availables groups</Text>
              </ListItem> 
              {grpsContent}
            </Content> 
            <Footer theme={myTheme}>
              <FooterTab>
                <Button active>
                  Groups
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

module.exports = Groups;