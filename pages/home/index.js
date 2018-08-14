import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, FlatList, WebView } from "react-native";
import md5 from "md5";

import Com from "../../common/common";

import NowWeatherHead from "./components/nowWeatherHead";

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NowWeatherHead loc={navigation.getParam("loc")} weather={navigation.getParam("weather")} loadLoc={navigation.getParam("getLoc")} />
    };
  };
  constructor() {
    super();
    this.state = {
      loc: false,
      weather: {},
      preWeather: false,
      news: []
    };
  }
  componentDidMount() {
    this.getLoc();
    this.getNews();
    this.props.navigation.setParams({
      getLoc: this.getLoc.bind(this)
    });
  }
  getLoc() {
    navigator.geolocation.getCurrentPosition(info => {
      const url = `https://free-api.heweather.com/s6/weather/now?location=${info.coords.latitude},${info.coords.longitude}&key=1f588e1a434d45e981f079c3e7790ed1`;
      const url2 = `https://free-api.heweather.com/s6/weather/hourly?location=${info.coords.latitude},${info.coords.longitude}&key=1f588e1a434d45e981f079c3e7790ed1`;
      this.getWeather(url);
      this.getPreWeather(url2);
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
        this.props.navigation.setParams({
          loc: [admin_area, location],
          weather
        });
      })
      .catch(err => {
        this.setState({
          loc: false
        });
        this.props.navigation.setParams({
          loc: false
        });
      });
  }
  getPreWeather(url) {
    fetch(url, { method: "get" })
      .then(res => res.json())
      .then(data => {
        const pre = data.HeWeather6[0].hourly.find(item => {
          const code = parseInt(item.cond_code, 10);
          return code > 199;
        });
        this.setState({
          preWeather: pre ? { time: pre.time, text: pre.cond_txt } : false
        });
      });
  }
  getNews() {
    const key = "WNZfRelq9gie5PGg";
    const sec = "ba1e8a62914d44a38c9486e5b874e1ea";
    const time = Date.now();
    const md5Text = md5(sec + time + key);
    const url = `https://api.xinwen.cn/news/hot?access_key=${key}&timestamp=${time}&signature=${md5Text}`;
    fetch(url, { method: "get" })
      .then(res => res.json())
      .then(data => {
        console.log(data.data.news);
        this.setState({
          news: data.data.news
        });
      });
  }
  _keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View>
        <View style={styles.preWeather}>
          {this.state.preWeather ? (
            <Image style={styles.locIcon} source={require("../../assets/icons/warning.png")} />
          ) : (
            <Image style={styles.locIcon} source={require("../../assets/icons/success.png")} />
          )}
          <Text>{this.state.preWeather ? `注意！${this.state.preWeather.time},会有${this.state.preWeather.text},做好准备` : "今天天气不错，随便浪！"}</Text>
        </View>
        <FlatList
          data={this.state.news}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate("newsDetail", { url: item.url })}>
                <View style={{ flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#d0d0d0", marginLeft: 10, marginRight: 10 }}>
                  <View style={{ flex: 3 }}>
                    <Text style={{ color: "#333" }}>{item.title}</Text>
                  </View>
                  <Image source={{ uri: item.thumbnail_img[0] }} style={{ width: 150, height: 100, marginLeft: 5, resizeMode: "contain" }} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preWeather: {
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  locIcon: {
    width: 20,
    height: 20
  }
});
