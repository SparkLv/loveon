import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, AsyncStorage, TouchableNativeFeedback } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class More extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      pData: null
    }
  }
  componentDidMount() {
    this.getUserInfo();
    this.getPuserInfo();
  }
  async logout() {
    await AsyncStorage.removeItem('userInfo');
    this.props.navigation.replace('Login');
  }
  async getUserInfo() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    this.setState({
      userInfo: JSON.parse(userInfo)
    })
  }
  async getPuserInfo() {
    const pUserInfo = await AsyncStorage.getItem('pUserInfo');
    this.setState({
      pData: JSON.parse(pUserInfo)
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", position: "relative" }}>
        <View style={styles.listBox}>
          <Image source={{ uri: this.state.userInfo.headImg }} style={{ width: 45, height: 45, borderRadius: 22.5 }} />
          <Text style={styles.usernameText}>{this.state.userInfo.name}</Text>
        </View>
        <View style={[styles.listBox, { backgroundColor: '#fff', justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="heart-pulse" color="#ea4335" size={35} />
            <Text style={{marginLeft:5}}>另一半</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.state.pData ? <Image source={{ uri: this.state.pData.headImg }} style={{ width: 45, height: 45, borderRadius: 22.5 }} /> : null}
            <Text style={[styles.usernameText, { color: '#333' }]}>{this.state.pData ? this.state.pData.name : '还没有另一半'}</Text>
          </View>
        </View>
        <TouchableNativeFeedback onPress={this.logout.bind(this)}>
          <View style={styles.logoutBtn}>
            <Text style={styles.logoutBtnText}>退出登陆</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listBox: {
    height: 65,
    backgroundColor: '#1b82d1',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    width: '100%',
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  usernameText: {
    color: "#fff",
    marginLeft: 10
  },
  logoutBtn: {
    width: '80%',
    height: 40,
    backgroundColor: '#e56f5a',
    position: 'absolute',
    bottom: 50
  },
  logoutBtnText: {
    color: '#fff',
    lineHeight: 40,
    textAlign: 'center'
  }
})
