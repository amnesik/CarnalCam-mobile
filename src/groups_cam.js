'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, Spinner, List, ListItem, Text, Badge } from 'native-base';

import routes from './routes';
import ExNavigator from '@exponent/react-native-navigator';
import myTheme from './themes/theme-footer';
import myThemeView from './themes/theme-people';

class GroupsCam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingGrps: true,
            error: false,
            groups: JSON.parse('[{"name" : "Waiting...", "membersCount" : "..."}]')
        }
    }
  
    componentDidMount() {
      this._getAllDeviceGroup();
    } 
  
    _getAllDeviceGroup() {
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/DeviceGroup', {
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
            console.log('------- CAM GROUPS -------');
            console.log(resJson);
            if(resJson.length !== 0) {
              // Put they groups into var
              resJson.map(function (key) {
                key.membersCount = key.devices.length
              });
              this.setState({
                groups: resJson,
                loadingGrps: false,
              });
            } else {
              this.setState({
                groups: JSON.parse('[{"name" : "No camera groups available", "membersCount" : "..."}]'),
                loadingGrps: false,
              }); 
            }
          }  
        })
        .catch( (error) => {
          console.log(error);
          this.setState({
            groups: JSON.parse('[{"name" : "No camera groups available", "membersCount" : "..."}]'),
            loadingGrps: false,
          });
        });
    }

    render() {
        var grpsContent;
        
        if(this.state.loadingGrps) {
          var grpsContent = (<Spinner />);
        } else {
          var grpsContent = (
            <List dataArray={this.state.groups}
              renderRow={(groupCam) =>
                  <ListItem onPress={() => {
                    this.props.navigator.push(routes.showCamListRoute(groupCam))
                  }}>
                      <Text style={{color: '#bdc3c7'}}>{groupCam.name}</Text>
                      <Badge>{groupCam.membersCount}</Badge>
                  </ListItem>
              }>
            </List>
          );
        }
      
        return ( 
          <Container> 
            <Content style={{marginTop: 64}} theme={myThemeView}>
              <ListItem itemDivider>
                  <Text>Availables camera groups</Text>
              </ListItem> 
              {grpsContent}
            </Content> 
            <Footer theme={myTheme}>
              <FooterTab>
                <Button onPress={() => {
                        this.props.navigator.replace(routes.groupsRoute())
                      }}>
                  Groups
                  <Icon name='ios-people'/>
                </Button>
                <Button active>
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

module.exports = GroupsCam;