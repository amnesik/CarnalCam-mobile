'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Thumbnail, Text } from 'native-base';
import { WebView } from 'react-native';

import routes from './routes';
import myTheme from './themes/theme-footer';

class Showcam extends Component {
    constructor(props) {
        super(props);
    }

    _turnLeft(){
        fetch('http://127.0.0.1:8888/turn_left', {
            method: 'GET'
        }).then( (res) => res.json())
            .then( (resJson) => {
                console.log(resJson);
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    _turnRight(){
        fetch('http://127.0.0.1:8888/turn_right', {
            method: 'GET'
        }).then( (res) => res.json())
            .then( (resJson) => {
                console.log(resJson);
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    render() {
        //var ws = new WebSocket('ws://'+window.SERVER_IP +':'+ window.SERVER_PORT+'/path/'+this.props.currentUser.user.id);
        //if(this.props.currentUser.user.role == "manager"){
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
                                this._turnLeft()
                            }}>
                                Left
                                <Icon name='ios-arrow-dropleft' />
                            </Button>
                            <Button active>
                                Off
                                <Icon name='ios-power' />
                            </Button>
                            <Button onPress={() => {
                                this._turnRight()
                            }}>
                                Right
                                <Icon name='ios-arrow-dropright' />
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            );
       /* }else {
            return (
                <Container style={{'marginTop': 64}}>
                    <Content>
                        <WebView
                            source={{uri: 'https://github.com/facebook/react-native'}}
                            style={{width: 375, height:600}}
                        />
                    </Content>

                    <Footer theme={myTheme}>

                    </Footer>
                </Container>
            );
        }*/
    }
}

module.exports = Showcam;