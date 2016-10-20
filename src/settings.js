'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';

import routes from './routes';
import myTheme from './themes/theme-footer';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container> 
            <Content>
                    
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