import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class NowWeatherHead extends Component {
  constructor() {
    super();
    this.state = {
      loc: false,
      weather: {}
    };
  }
  componentWillReceiveProps(next) {
    this.setState({
      loc: next.loc,
      weather: next.weather
    });
  }
  getWeather(url) {
    fetch(url, { method: "get" })
      .then(res => res.json())
      .then(data => {
        const { admin_area, location } = data.HeWeather6[0].basic;
        const weather = data.HeWeather6[0].now;
        this.setState({
          loc: [admin_area, location],
          weather
        });
      })
      .catch(err => {
        this.setState({
          loc: false
        });
      });
  }
  render() {
    return (
      <View style={styles.head}>
        <View style={styles.nowWeather}>
          <TouchableOpacity onPress={this.props.getLoc}>
            <Image style={styles.locIcon} source={require("../../../assets/icons/location.png")} />
          </TouchableOpacity>
          {this.state.loc ? (
            <View style={styles.nowWeather}>
              <Text style={styles.nowText}>
                {this.state.loc[0]}&nbsp;&nbsp;
                {this.state.loc[1]}&nbsp;&nbsp;
                {this.state.weather.tmp}°C&nbsp;&nbsp;
                {this.state.weather.cond_txt}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={this.props.getLoc}>
              <Text style={styles.nowText}>天气获取失败，点击重新获取</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: "#1b82d1"
  },
  nowWeather: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8
  },
  nowText: {
    marginLeft: 5,
    color: "#fff"
  },
  locIcon: {
    width: 20,
    height: 20
  }
});
