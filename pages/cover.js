import React, { Component } from "react";

import { StyleSheet, Text, TouchableOpacity, ImageBackground, AsyncStorage, AppState } from "react-native";

import store from '../store';

export default class Cover extends Component {
  constructor() {
    super();
    this.state = {
      time: 5
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.timer = setInterval(this.reduceTime.bind(this), 1000);
  }
  async closeCover() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const userInfoObj = JSON.parse(userInfo);
    if (userInfo) {
      store.dispatch({ type: "USER_INFO", data: userInfoObj });
      if (userInfo.pid) {
        this.getPidInfo(userInfoObj.pid)
      } else {
        this.closeRun('Main');
      }
    } else {
      this.closeRun('Login')
    }
  }
  getPidInfo(pid) {
    const url = `http://10.0.52.22:2421/loveon/user/getById/${pid}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        store.dispatch({ type: "PUSER_INFO", data });
        this.closeRun('Main')
      });
  }
  reduceTime() {
    if (this.state.time === 1) {
      this.closeCover();
    } else {
      this.setState({
        time: this.state.time - 1
      });
    }
  }
  closeRun(url) {
    clearInterval(this.timer);
    this.props.navigation.replace(url);
  }
  render() {
    return (
      <ImageBackground source={require("../assets/img/cover.png")} style={styles.coverImg}>
        <TouchableOpacity style={styles.skipBox} onPress={this.closeCover.bind(this)}>
          <Text style={styles.skipText}>{`跳过(${this.state.time})`}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  coverImg: {
    width: "100%",
    height: "100%",
    flexDirection: "row-reverse"
  },
  skipBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 30,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginRight: 15,
    marginTop: 15
  },
  skipText: {
    color: "#fff"
  }
});
