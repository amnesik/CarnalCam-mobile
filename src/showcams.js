'use strict';

import React, { Component } from 'react';
import { Container, Content, Spinner, List, ListItem, Text } from 'native-base';

import routes from './routes';
import myThemeView from './themes/theme-people';

class ShowCams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingDevices: true,
            error: false,
            devices: JSON.parse('[{"name" : "No devices available"}]')
        }
    }
  
    componentDidMount() {
      this._getAllDevice();
    } 
  
    _getAllDevice() {
      fetch('http://' + window.SERVER_IP + ':' + window.SERVER_PORT + '/DeviceGroup/' + this.props.deviceGrp.id, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + this.props.currentUser.token
          }
      }).then( (res) => res.json())
        .then( (resJson) => {
          if(resJson !== null) {
            if(resJson.devices.length !== 0) {
              // Put they groups into var
              this.setState({
                devices: resJson.devices,
                loadingDevices: false,
              });
            } else {
              this.setState({
                devices: JSON.parse('[{"name" : "No devices available"}]'),
                loadingDevices: false,
              }); 
            }
          }  
        })
        .catch( (error) => {
          console.log(error);
          this.setState({
            devices: JSON.parse('[{"name" : "No devices available"}]'),
            loadingDevices: false,
          });
        });
    }

    render() {
        var devicesContent;
        
        if(this.state.loadingDevices) {
          var devicesContent = (<Spinner />);
        } else {
          var devicesContent = (
            <List dataArray={this.state.devices}
              renderRow={(device) =>
                  <ListItem onPress={() => {
                    this.props.navigator.push(routes.showCamRoute(device))
                  }}>
                      <Text style={{color: '#bdc3c7'}}>{device.name}</Text>
                  </ListItem>
              }>
            </List>
          );
        }
      
        return ( 
          <Container> 
            <Content style={{marginTop: 64}} theme={myThemeView}>
              <ListItem itemDivider>
                  <Text>Availables camera</Text>
              </ListItem> 
              {devicesContent}
            </Content> 
          </Container>
        );

    }
}

module.exports = ShowCams;