import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, AsyncStorage, FlatList, Dimensions, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class Fav extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={() => { navigation.navigate('favPub') }} style={{ marginRight: 5 }} >
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      )
    };
  };
  constructor() {
    super();
    this.state = {
      trends: [],
      userInfo: {},
      pData: {},
      width: 0,
      ImgDetailVis: false,
      openImg: 0,
      openImgArr: []
    }
  }
  componentWillMount() {
    this.getUserInfo();
    const { height, width } = Dimensions.get('window');
    this.setState({
      width
    })
  }
  async getUserInfo() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const obj = JSON.parse(userInfo)
    this.getInit(obj.id, obj.pid)
    this.setState({
      userInfo: obj
    }, this.getPuserInfo.bind(this))
  }
  async getPuserInfo() {
    const pUserInfo = await AsyncStorage.getItem('pUserInfo');
    this.setState({
      pData: JSON.parse(pUserInfo)
    })
  }
  showImgDetail(arr, index) {
    this.setState({
      openImgArr: arr,
      openImg: index
    }, () => {
      this.setState({
        ImgDetailVis: true
      })
    })
  }
  hideImgDetail() {
    this.setState({
      ImgDetailVis: false
    })
  }
  getInit(id, pid) {
    fetch(`http://10.0.52.22:2421/loveon/getInit/${id}/${pid}`)
      .then(res => res.json())
      .then(data => {
        if (data.code == 1) {
          const arr = JSON.parse(JSON.stringify(data.data));
          const arr1 = arr.map(item => {
            item.imgArr = item.img ? this.imgFormat(item.img) : [];
            return item
          })
          this.setState({
            trends: arr1
          })
        }
      });
  }
  updataTrends() {
    fetch(`http://10.0.52.22:2421/loveon/getUpdate`, {
      method: "post", headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.userInfo.id,
        pid: this.state.userInfo.pid,
        lid: this.state.trends[this.state.trends.length - 1].id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == 1) {
          const arr = JSON.parse(JSON.stringify(data.data));
          const arr1 = arr.map(item => {
            item.imgArr = item.img ? this.imgFormat(item.img) : [];
            return item
          })
          console.log(arr1);
          this.setState({
            trends: this.state.trends.concat(arr1)
          })
        }
      });
  }
  imgFormat(str) {
    return str.split(',')
  }
  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
        <Image source={{ uri: item.sid == this.state.pData.id ? this.state.pData.headImg : this.state.userInfo.headImg }} style={{ width: 50, height: 50, marginRight: 10 }} />
        <View style={{ paddingTop: 10 }}>
          <Text style={{ fontSize: 16, color: '#4285f4', marginBottom: 10 }}>{item.sid == this.state.pData.id ? this.state.pData.name : this.state.userInfo.name}</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>{item.text}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", width: this.state.width - 70 }}>
            {item.imgArr.map((url, index) => {
              return (
                <TouchableWithoutFeedback key={index} onPress={this.showImgDetail.bind(this, item.imgArr, index)}>
                  <View style={{ marginRight: 5, marginBottom: 5 }}>
                    <Image source={{ uri: url }} style={{ width: 80, height: 80 }} />
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
          <Text style={{ fontSize: 12 }}>{item.loc}</Text>
          <Text style={{ fontSize: 12 }}>{item.stime.split('.')[0].replace('T', ' ')}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
        <FlatList
          style={{ width: '95%', marginBottom: 10 }}
          data={this.state.trends}
          keyExtractor={this._keyExtractor}
          extraData={this.state}
          renderItem={this._renderItem}
          onEndReached={this.updataTrends.bind(this)}
          onEndReachedThreshold={0.5}
        />
        <Modal
          visible={this.state.ImgDetailVis}
          transparent={true}
          onRequestClose={this.hideImgDetail.bind(this)}
          onDismiss={this.hideImgDetail.bind(this)}
        >
          <ImageViewer renderHeader={(index) => {
            return (
              <View style={{ flexDirection: "row", width: '100%', height: 50, justifyContent: "space-between", alignItems: "center", padding: 5 }}>
                <TouchableWithoutFeedback onPress={this.hideImgDetail.bind(this)}>
                  <View style={{ width: 25, height: 25 }}>
                    <Icon name="arrow-left" size={25} color="#fff" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          }} imageUrls={this.state.openImgArr.map(item => { return { url: item } })} index={this.state.openImg} renderIndicator={() => null
          } />
        </Modal>
      </View>
    );
  }
}
