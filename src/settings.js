'use strict';

import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import {
    AsyncStorage,
    AppRegistry,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text
} from 'react-native'

import routes from './routes';

var STORAGE_TOKEN = '@AsyncStorageToken:key';
var STORAGE_USER_ID = '@AsyncStorageUserID:key';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container> 
            <Content>
                    
            </Content>
            
            <Footer>
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