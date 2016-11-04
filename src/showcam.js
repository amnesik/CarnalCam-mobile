'use strict';

import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Row, Grid} from 'native-base';
import { Dimensions } from 'react-native';
import myTheme from './themes/theme-footer';

var io = {
  socket: null
};

class Showcam extends Component {
    constructor(props) {
        super(props);
        io.socket = this.props.socket;
        this.state = {
          error: false,
          device: this.props.device,
          position: this.props.device.position,
          recording: false,
          statusText: 'On',
          leftIsActive: false,
          rightIsActive: false,
        }
    }

    _fetchPosition(position){
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/Device/' + this.props.device.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + this.props.currentUser.token
        },
        body: JSON.stringify({
          position: position
        })
      })
    }

    _changeDirection(rate) {
      var position = parseInt(this.state.position) + parseInt(rate)
      this._fetchPosition(position)
      if(position === 180){
        this.setState({
          rightIsActive: false
        })
      } else if(position === 0){
        this.setState({
          leftIsActive: false
        })
      } else {
        this.setState({
          leftIsActive: true,
          rightIsActive: true
        })
      }
    }

    _connectBtn() {
      // Recording
      if(!this.state.recording){
        this._socketConnect();
        if(this.state.position > 0 && this.state.position < 180 && !this.state.recording){
          this.setState({
            leftIsActive: true,
            rightIsActive: true,
            recording: true,
            statusText: 'Off'
          })
        } else if(this.state.position === 0){
          this.setState({
            rightIsActive: true,
            recording: true,
            statusText: 'Off'
          })
        } else {
          this.setState({
            leftIsActive: true,
            recording: true,
            statusText: 'Off'
          })
        }
      } else {
        this._socketDisconnect();
        this.setState({
          leftIsActive: false,
          rightIsActive: false,
          recording: false,
          statusText: 'On'
        })
      }
    }

    _socketConnect() {
      io.socket.get('/device/' + this.props.device.id, (resData, jwres) => {
        if(typeof resData !== 'undefined') {
          this.setState({
            position: resData.position
          })
        } else {
          this._socketConnect();
        }
      })
      if(!this.state.recording){
        io.socket.on('device', (msg) => {
          this.setState({
            position: msg.data.position
          })
        })
      }
    }

    _socketDisconnect() {
      io.socket.delete('/device/' + this.props.device.id);
      if(this.state.recording){
        io.socket.off('device')
      }
      this.setState({
        recording: false
      })
    }

    render() {
        return (
            <Container>
              <Content style={{'marginTop': 64, marginBottom: -64}}>
                <Grid>
                  <Row alignItems='center' justifyContent='center' style={{height: 100, backgroundColor: '#7f8c8d'}}>
                    <Text style={{color: 'white'}}>{this.state.position} °</Text>
                  </Row>
                </Grid>
              </Content>
              <Footer theme={myTheme}>
                  <FooterTab>
                      <Button active={this.state.leftIsActive} onPress={() => {
                        if(this.state.leftIsActive) {
                          this._changeDirection(-10)
                        }
                      }}>
                          Left
                          <Icon name='ios-arrow-dropleft' />
                      </Button>
                      <Button active onPress={() => {
                        this._connectBtn()
                      }}>
                          {this.state.statusText}
                        <Icon name='ios-power' />
                      </Button>
                      <Button active={this.state.rightIsActive} onPress={() => {
                        if(this.state.rightIsActive) {
                          this._changeDirection(10)
                        }
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
