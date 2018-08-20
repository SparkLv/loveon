import React, { Component } from "react";

import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, AsyncStorage } from "react-native";

export default class Cover extends Component {
  constructor() {
    super();
    this.state = {
      time: 5,
      userInfo: null
    };
  }
  componentDidMount() {
    this.timer = setInterval(this.reduceTime.bind(this), 1000);
  }
  async getUserInfo() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    this.setState({
      userInfo
    }, this.gotoHome)
  }
  reduceTime() {
    if (this.state.time === 1) {
      this.getUserInfo();
    } else {
      this.setState({
        time: this.state.time - 1
      });
    }
  }
  gotoHome() {
    clearInterval(this.timer);
    const url = this.state.userInfo ? 'Main' : 'Login';
    this.props.navigation.replace(url);
  }
  render() {
    return (
      <ImageBackground source={require("../assets/img/cover.jpg")} style={styles.coverImg}>
        <TouchableOpacity style={styles.skipBox} onPress={this.getUserInfo.bind(this)}>
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
    borderColor: "#333",
    borderRadius: 5,
    marginRight: 15,
    marginTop: 15
  },
  skipText: {
    color: "#333"
  }
});
