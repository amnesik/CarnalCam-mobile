'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Thumbnail, Text } from 'native-base';

import routes from './routes';
import myTheme from './themes/theme-footer';

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [1,1,1,1,1,1,1]
        };
        // Change status bar color to white
        //console.log("current_id : " + JSON.parse(window.CURRENT_USER))
    }

    render() {
        return (
            <Container style={{marginTop: 64}}>
                <Content>
                    <List dataArray={this.state.items}
                          renderRow={(item) =>
                              <ListItem onPress={() => {
                                  this.props.navigator.push(routes.showcamRoute())
                              }}>
                                  <Thumbnail square size={80}
                                             source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                                  <Text>Infiniti</Text>
                                  <Text note>1989</Text>
                              </ListItem>
                          }>
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

module.exports = Camera;