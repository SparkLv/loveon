import React, { Component } from "react";
import { View } from "react-native";
import store from '../../store'
import { info as styles } from '../../common/styles'

import TopBar from './components/topBar';
import Chat from './components/Chat'
import Send from './components/send'

export default class Info extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  };
  constructor() {
    super();
    this.state = {
      userInfo: store.getState().userInfo,
      pData: store.getState().pUserInfo,
    }
    this.socket = store.getState().socket;
  }
  sendMsg(text) {
    this.socket.emit('send', {text});
  }
  render() {
    return (
      <View style={styles.outerBox}>
        <TopBar navigation={this.props.navigation} pData={this.state.pData} />
        <Chat text={this.state.text} userInfo={this.state.userInfo} pData={this.state.pData} />
        <Send userInfo={this.state.userInfo} send={this.sendMsg.bind(this)} />
      </View>
    );
  }
}
