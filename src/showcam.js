'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Thumbnail, Text } from 'native-base';
import { WebView } from 'react-native';

import routes from './routes';
import myTheme from './themes/theme-footer';

class Showcam extends Component {

    render() {
        return (
            <Container style={{'marginTop': 64}}>
                <Content>
                    <WebView
                        source={{uri: 'https://github.com/facebook/react-native'}}
                        style={{width: 375, height:600}}
                    />
                </Content>

                <Footer theme={myTheme}>
                    <FooterTab>
                        <Button onPress={() => {
                            this.props.navigator.replace(routes.peopleRoute())
                        }}>
                            Left
                            <Icon name='ios-arrow-dropleft' />
                        </Button>
                        <Button active>
                            Photo
                            <Icon name='ios-camera' />
                        </Button>
                        <Button onPress={() => {
                            this.props.navigator.replace(routes.settingsRoute())
                        }}>
                            Right
                            <Icon name='ios-arrow-dropright' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );

    }
}

module.exports = Showcam;