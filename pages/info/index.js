import React, { Component } from "react";
import { View, Text, Image, FlatList, Dimensions, TextInput, TouchableOpacity } from "react-native";
import store from '../../store'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { info as styles } from '../../common/styles'
import { NotificationsAndroid } from 'react-native-notifications';

import Ajax from '../../common/ajax';

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  };
  constructor() {
    super();
    this.state = {
      mes: [],
      userInfo: store.getState().userInfo,
      pData: store.getState().pUserInfo,
      height: 0,
      text: ''
    }
    this.canDrop = true
  }
  componentDidMount() {
    this.socketInit();
    var { height } = Dimensions.get('window');
    this.setState({
      height
    })
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  socketInit() {
    this.socket = Ajax.socketCon(this.state.userInfo.id, this.state.userInfo.pid);
    this.socket.on('message', (val) => {
      if (this.state.userInfo.id == val.id) {
        this.setState({
          mes: val.data
        })
      }
    })
    this.socket.on('sendResult', (data) => {
      if (data.code == 1) {
        const obj = data.data;
        this.setState({
          mes: [obj].concat(this.state.mes),
        }, () => {
          if (data.data.sid != this.state.userInfo.id) {
            NotificationsAndroid.localNotification({
              title: this.state.pData.name,
              body: data.data.text
            });
          }
        })
      }
    })
    this.socket.on('sendHistory', (data) => {
      if (this.state.userInfo.id == data.id) {
        this.setState({
          mes: this.state.mes.concat(data.data)
        }, () => {
          this.canDrop = true;
        })
      }
    })
  }
  inputText(val) {
    this.setState({
      text: val
    })
  }
  sendMsg() {
    this.socket.emit('send', { text: this.state.text });
    this.setState({
      text: ''
    })
  }
  getHistory() {
    if (this.canDrop) {
      this.canDrop = false;
      this.socket.emit('getHistory', { id: this.state.userInfo.id, finId: this.state.mes[this.state.mes.length - 1].id });
    }
  }
  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item, index }) => {
    const isP = item.sid != this.state.userInfo.id;
    const imgUrl = isP ? this.state.pData.headImg : this.state.userInfo.headImg;
    const time = new Date(item.time).getTime();
    const po = index == (this.state.mes.length - 1) ? index : index + 1;
    const pTime = new Date(this.state.mes[po].time).getTime();
    const showTime = (time - pTime) > 3600000;
    return (
      <View>
        <View>
          {showTime ? <Text style={{ textAlign: "center", fontSize: 12 }}>{item.time}</Text> : null}
        </View>
        <View style={{ flexDirection: isP ? 'row' : "row-reverse", padding: 10 }}>
          <Image source={{ uri: imgUrl }} style={{ width: 35, height: 35 }} />
          <Text style={{ color: '#000', backgroundColor: isP ? '#ebeced' : '#76afec', marginLeft: 10, marginRight: 10, padding: 8, maxWidth: 200 }}>{item.text}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.outerBox}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.tabBarLeftBtn}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20 }}>{this.state.pData.name ? this.state.pData.name : ''}</Text>
        </View>
        {this.state.userInfo.pid ? (
          <FlatList
            style={{ width: '100%', marginBottom: 50 }}
            ref={(list) => { this._list = list }}
            data={this.state.mes}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            renderItem={this._renderItem}
            onEndReached={this.getHistory.bind(this)}
            onEndReachedThreshold={0.01}
            inverted
          />
        ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="speaker-notes-off" size={40} color="#333" />
              <Text>暂无另一半，快去寻找另一半吧</Text>
            </View>
          )}
        <View style={styles.inputBox}>
          <Image source={{ uri: this.state.userInfo.headImg }} style={styles.inputBoxHead} />
          <TextInput multiline onChangeText={this.inputText.bind(this)} value={this.state.text} style={styles.inputBoxInput} placeholder="Add Message" />
          <TouchableOpacity onPress={this.sendMsg.bind(this)} disabled={(!this.state.text.length) || !this.state.userInfo.pid}>
            <View style={{ width: 50, height: 40 }}>
              <Text style={{ color: this.state.text.length && this.state.userInfo.pid ? "#1b82d1" : '#c6ddeb', lineHeight: 40 }}>send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
