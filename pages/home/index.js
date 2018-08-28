import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList, WebView, Clipboard, StatusBar, AsyncStorage } from "react-native";
import md5 from "md5";
import Modalbox from 'react-native-modalbox';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-root-toast';

import store from '../../store'

import Com from "../../common/common";

import NowWeatherHead from "./components/nowWeatherHead";
import AddPartner from './components/addPartner'

import { NotificationsAndroid } from 'react-native-notifications';

import ListenMsg from '../../common/listenMsg'

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NowWeatherHead loc={navigation.getParam("loc")} weather={navigation.getParam("weather")} loadLoc={navigation.getParam("getLoc")} />,
      headerRight: <AddPartner userInfo={navigation.getParam("userInfo")} pData={navigation.getParam('pData')} showBox={navigation.getParam("showAddBox")} />
    };
  };
  constructor() {
    super();
    this.state = {
      loc: false,
      weather: {},
      preWeather: false,
      news: [],
      userInfo: {},
      pData: null,
      addBoxVis: false,
      code: '',
      keyboardVis: false
    };
  }
  componentDidMount() {
    ListenMsg.sc();
    // BackgroundTask.schedule()
    ListenMsg.init();
    this.getUserInfo();
    this.getLoc();
    this.getNews();
    this.props.navigation.setParams({
      getLoc: this.getLoc.bind(this),
      showAddBox: this.showAddBox.bind(this)
    });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({
      keyboardVis: true
    })
  }
  _keyboardDidHide() {
    this.setState({
      keyboardVis: false
    })
  }
  async getUserInfo() {
    const info = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(info);
    this.setState({
      userInfo
    })
    this.props.navigation.setParams({
      userInfo
    });
    if (userInfo.pid) {
      this.getPidInfo(userInfo.pid);
    }
    else {
      AsyncStorage.removeItem('pUserInfo');
    }
  }
  getPidInfo(pid) {
    const url = `http://10.0.52.22:2421/loveon/user/getById/${pid}`;
    fetch(url, { method: "get" })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pData: data
        })
        this.props.navigation.setParams({
          pData: data
        });
        this.savePdata(data);
      });
  }
  savePdata(data) {
    AsyncStorage.setItem('pUserInfo', JSON.stringify(data));
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
        this.setState({
          news: data.data.news
        });
      });
  }
  _keyExtractor = (item, index) => index.toString();
  hideAddBox() {
    this.setState({
      addBoxVis: false,
      code: ''
    })
  }
  showAddBox() {
    this.setState({
      addBoxVis: true
    })
  }
  async copyKey() {
    await Clipboard.setString(this.state.userInfo.code.toString());
    this.toast('密钥已复制到剪切板')

  }
  toast(message) {
    Toast.show(message, {
      duration: 2000,
      position: -80,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  }
  inputCode(val) {
    const value = val.length > 7 ? this.state.code : val
    this.setState({
      code: value
    })
  }
  conLover() {
    fetch('http://10.0.52.22:2421/loveon/user/connect', {
      method: "post", headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.userInfo.id,
        code: this.state.code
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == 1) {
          this.toast('配对成功，请重新登陆');
          this.props.navigation.replace('Login');
        }
        else {
          this.toast(data.message);
        }
      });
  }
  clickCodeInput() {
    if (!this.state.keyboardVis) {
      this.codeInput.blur();
      setTimeout(() => { this.codeInput.focus() }, 100)
    }
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor={this.props.navigation.state.routeName == 'cover' ? "#fff" : "#1b82d1"} />
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
        <Modalbox
          isOpen={this.state.addBoxVis}
          onClosed={this.hideAddBox.bind(this)}
          position="center"
          backButtonClose={true}
          swipeToClose={false}
          style={{ height: 220, width: 300 }}
        >
          <ScrollableTabView>
            <View tabLabel="输入密钥" style={{ flex: 1, position: "relative" }}>
              <TextInput ref={input => { this.codeInput = input }} onChangeText={this.inputCode.bind(this)} underlineColorAndroid="transparent" value={this.state.code} style={{ width: 0, opacity: 0 }} />
              <View style={{ flexDirection: "row", zIndex: 10, position: "absolute", top: 30, height: 30, width: 240, left: 20 }}>
                {[0, 1, 2, 3, 4, 5, 6].map(item => {
                  return (
                    <TouchableWithoutFeedback key={item} onPress={this.clickCodeInput.bind(this)}>
                      <View style={{ height: 30, width: 30, borderBottomColor: '#333', borderBottomWidth: 1, marginLeft: 5 }}>
                        <Text style={{ fontSize: 20, textAlign: "center" }}>{this.state.code.split('')[item]}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })}
              </View>
              <View style={{ flexDirection: 'row', position: "absolute", bottom: 0, borderTopColor: '#aaa', borderTopWidth: 1 }}>
                <TouchableOpacity onPress={this.conLover.bind(this)} style={{ flex: 1, height: 40 }}>
                  <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40, borderRightWidth: 1, borderRightColor: '#aaa' }}>确定</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.hideAddBox.bind(this)} style={{ flex: 1, height: 40 }}>
                  <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40 }}>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View tabLabel="获取密钥" style={{ flex: 1, position: "relative" }}>
              <Text style={{ textAlign: 'center', fontSize: 24, letterSpacing: 10, marginTop: 50, color: 'navy' }}>{this.state.userInfo.code}</Text>
              <View style={{ flexDirection: 'row', position: "absolute", bottom: 0, borderTopColor: '#aaa', borderTopWidth: 1 }}>
                <TouchableOpacity onPress={this.copyKey.bind(this)} style={{ flex: 1, height: 40 }}>
                  <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40, borderRightWidth: 1, borderRightColor: '#aaa' }}>复制</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.hideAddBox.bind(this)} style={{ flex: 1, height: 40 }}>
                  <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40 }}>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollableTabView>
        </Modalbox>
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
