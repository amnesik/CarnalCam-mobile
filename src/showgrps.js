'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Thumbnail, Text } from 'native-base';
import { WebView } from 'react-native';

import routes from './routes';
import myTheme from './themes/theme-footer';

class Showgrps extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{'marginTop': 64}}>
                <Content>
                  <ListItem itemDivider>
                    <Text>Availables groups</Text>
                  </ListItem> 
              </Content>
            </Container>
        );
    }
}

module.exports = Showgrps;