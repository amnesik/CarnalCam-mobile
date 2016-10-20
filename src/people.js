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
    Text,
    StatusBar,
    ListView
} from 'react-native'

import routes from './routes';
import ExNavigator from '@exponent/react-native-navigator';
import myTheme from './themes/theme-footer';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: null,
            token: null,
        };
        // Change status bar color to white
        StatusBar.setBarStyle('light-content');

        console.log("current_id : "+JSON.parse(window.CURRENT_USER))
    }

    render() {
        return ( 
          <Container> 


            <Content>
                <Text>
                </Text>
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