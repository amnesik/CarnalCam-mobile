'use strict';

import React, { Component } from 'react';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, List, ListItem, Thumbnail, Text, Grid, Row } from 'native-base';
import { WebView } from 'react-native';

import routes from './routes';
import myTheme from './themes/theme-footer';

class Showcam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            device:  this.props.device,
            status: this.props.device.recording,
            position:  this.props.device.position
        }
    }
  
    _changeDirection(rate) {
      console.log(rate);
      if((rate === 10 && this.state.position !== 180) || (rate === -10 && this.state.position !== 0)) {
        this.setState({
          position: parseInt(this.state.position) + parseInt(rate)
        })
      }
    }
  
    render() {
        if(this.state.status){
          var status = 'Off'
        } else {
          var status = 'On'
        }
        return (
            <Container>
              <Content style={{'marginTop': 64, marginBottom: -64}}>
                <Grid>
                  <Row alignItems='center' justifyContent='center'>
                    <Text style={{color: 'black'}}>{this.state.device.name}</Text>
                  </Row>
                  <Row alignItems='center' justifyContent='center'>
                    <Text>{this.state.position} °</Text>
                  </Row>
                </Grid>
              </Content>
              <Footer theme={myTheme}>
                  <FooterTab>
                      <Button active onPress={() => {this._changeDirection(-10)}}>
                          Left
                          <Icon name='ios-arrow-dropleft' />
                      </Button>
                      <Button active>
                          {status}
                        <Icon name='ios-power' />
                      </Button>
                      <Button active onPress={() => {this._changeDirection(10)}}>
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
