import React, { Component } from "react";

import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";

// import "whatwg-fetch";

import axios from "axios";

export default class Cover extends Component {
  constructor() {
    super();
    this.state = {
      time: 5
    };
  }
  componentDidMount() {
    this.timer = setInterval(this.reduceTime.bind(this), 1000);
    navigator.geolocation.getCurrentPosition(function(info) {
      const url = `https://free-api.heweather.com/s6/weather/now?location=${info.coords.latitude},${info.coords.longitude}&key=1f588e1a434d45e981f079c3e7790ed1`;
      // fetch(url,{method:'get'}).then(res=>{
      //   alert(JSON.stringify(res._bodylnit));
      // })
      axios.get(url).then(res => {
        alert(JSON.stringify(res));
      });
    });
  }
  reduceTime() {
    if (this.state.time === 1) {
      this.gotoHome();
    } else {
      this.setState({
        time: this.state.time - 1
      });
    }
  }
  gotoHome() {
    clearInterval(this.timer);
    this.props.navigation.replace("Main");
  }
  render() {
    return (
      <ImageBackground source={require("../assets/img/cover.jpg")} style={styles.coverImg}>
        <TouchableOpacity style={styles.skipBox} onPress={this.gotoHome.bind(this)}>
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
