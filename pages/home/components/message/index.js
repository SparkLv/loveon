import React, { Component } from "react";
import { View, AppState } from "react-native";
import store from '../../../../store'
import { info as styles } from '../../../../common/styles'
import Ajax from '../../../../common/ajax'
import Chat from './components/Chat'
import Send from './components/send'
import JPush from 'jpush-react-native';

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
      socket: false
    }
  }
  componentWillMount() {
    this.initSocket();
    JPush.addReceiveNotificationListener(this.receiveEvent)
  }
  componentWillUnmount() {
    this.state.socket.disconnect();
    JPush.removeReceiveNotificationListener(this.receiveEvent);
    JPush.resumePush();
  }
  receiveEvent() {
    if (AppState.currentState == 'active') {
      JPush.clearAllNotifications();
    }
  }
  initSocket() {
    const { userInfo: { id }, pData: { id: pid } } = this.state;
    Ajax.socketCon(id, pid, (socket) => {
      this.setState({
        socket
      })
    }, () => { alert('网络链接失败，请重试') })
  }
  sendMsg(text) {
    const { pushId, name } = this.state.pData;
    this.state.socket.emit('send', { text, pPushId: pushId, pName: name });
  }
  render() {
    return (
      <View style={styles.outerBox}>
        <Chat socket={this.state.socket} text={this.state.text} userInfo={this.state.userInfo} pData={this.state.pData} />
        <Send userInfo={this.state.userInfo} send={this.sendMsg.bind(this)} />
      </View>
    );
  }
}
