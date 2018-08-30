import React, { Component } from "react";

import { ImageBackground, AsyncStorage } from "react-native";
import { Cover as styles } from '../../common/styles'

import JPush from 'jpush-react-native';

import SaveInfo from '../../common/saveInfo'

JPush.notifyJSDidLoad((resultCode) => { });

export default class Cover extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  componentDidMount() {
    this.closeCover()
  }
  async closeCover() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      SaveInfo.save(userInfoObj, () => {
        this.closeRun('main');
      })
    }
    else {
      this.closeRun('login')
    }
  }
  closeRun(url) {
    setTimeout(() => { this.props.navigation.replace(url); }, 500);
  }
  render() {
    return (
      <ImageBackground source={require("../../assets/img/cover.png")} style={styles.coverImg}>
      </ImageBackground>
    );
  }
}
