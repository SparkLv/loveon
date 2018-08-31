import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, TouchableNativeFeedback } from "react-native";
import store from '../../store'
import { More as styles } from '../../common/styles'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class More extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: store.getState().userInfo,
      pData: store.getState().pUserInfo
    }
  }
  async logout() {
    await AsyncStorage.removeItem('userInfo');
    this.props.navigation.replace('login');
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
            <Text style={{ marginLeft: 5 }}>另一半</Text>
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
