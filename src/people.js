'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';

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
        console.log("current_id : " + JSON.parse(window.CURRENT_USER))  
    }

    render() {
        return ( 
          <Container> 
            <Content>
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