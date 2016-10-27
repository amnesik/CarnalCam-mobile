'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Thumbnail, Text, Spinner } from 'native-base';
import { WebView } from 'react-native';

import routes from './routes';
import myThemeView from './themes/theme-people';

class Showusrs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingUsrs: true,
            error: false,
            users: null
        }
    }
  
    componentDidMount() {
      this._getAllUsers();
    }
  
    _getAllUsers() {
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/UserGroup/' + this.props.group.id, {
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
            console.log('------- USERS -------');
            console.log(resJson);
            if(resJson.members.length !== 0) {
              // Put they groups into var
              this.setState({
                users: resJson.members,
                loadingUsrs: false,
              });
            } else {
              this.setState({
                users: JSON.parse('[{"username" : "No users available"}]'),
                loadingUsrs: false,
              }); 
            }
          }  
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    render() {
        var usrContent;
        
        if(this.state.loadingUsrs) {
          var usrContent = (<Spinner />);
        } else {
          var usrContent = (
            <List dataArray={this.state.users}
              renderRow={(user) =>
                  <ListItem>
                      <Text style={{color: '#bdc3c7'}}>{user.username}</Text>
                  </ListItem>
              }>
            </List>
          );
        }
      
        return (
            <Container style={{'marginTop': 64}}>
                <Content theme={myThemeView}>
                  <ListItem itemDivider>
                    <Text>Availables users</Text>
                  </ListItem> 
                  {usrContent}
              </Content>
            </Container>
        );
    }
}

module.exports = Showusrs;