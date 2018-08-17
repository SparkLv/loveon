import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import io from 'socket.io-client';

export default class Info extends Component {
  constructor() {
    super();
    this.state = {
      mes: []
    }
  }
  componentDidMount() {
    // const socket = io('ws://10.0.52.22:2500?id=1');
    // socket.on('message', (e) => {
    //   this.setState({
    //     mes: this.state.mes.concat([e])
    //   })
    // })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>info Screen</Text>
        {this.state.mes.map((item,index) => <Text key={index}>{item}</Text>)}
      </View>
    );
  }
}
