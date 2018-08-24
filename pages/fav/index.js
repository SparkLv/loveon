import React, { Component } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import store from '../../store'
import Ajax from '../../common/ajax'
import FavBox from './components/favBox'
import ImgDetail from './components/imgDetail'

export default class Fav extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '动态',
      headerTitleStyle: {
        fontSize: 16
      },
      headerRight: navigation.getParam('pid') ? (
        <TouchableOpacity onPress={() => { navigation.navigate('favPub') }} style={{ marginRight: 5 }} >
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>) : null

    };
  };
  constructor() {
    super();
    this.state = {
      trends: [],
      userInfo: store.getState().userInfo,
      pData: store.getState().pUserInfo,
      width: 0,
      imgDetailVis: false,
      openImg: 0,
      openImgArr: []
    }
  }
  componentWillMount() {
    const { id, pid } = this.state.userInfo;
    const { width } = Dimensions.get('window');
    Ajax.getInitTrends(id, pid, this.makeTrends.bind(this), (err) => { })
    this.setState({ width })
  }
  componentDidMount() {
    this.props.navigation.setParams({
      pid: this.state.userInfo.pid
    })
  }
  showImgDetail(arr, index) {
    this.setState({
      openImgArr: arr,
      openImg: index
    }, () => {
      this.setState({
        imgDetailVis: true
      })
    })
  }
  hideImgDetail() {
    this.setState({
      imgDetailVis: false
    })
  }
  updataTrends() {
    const { id, pid } = this.state.userInfo;
    const body = {
      id, pid,
      lid: this.state.trends[this.state.trends.length - 1].id
    }
    Ajax.updataTrends(body, this.makeTrends.bind(this), (err) => { })
  }
  makeTrends(data) {
    const arr = JSON.parse(JSON.stringify(data));
    const arr1 = arr.map(item => {
      item.imgArr = item.img ? item.img.split(',') : [];
      return item
    })
    this.setState({
      trends: this.state.trends.concat(arr1)
    })
  }
  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item }) => {
    return <FavBox item={item} userData={this.state.userInfo} pData={this.state.pData} width={this.state.width} showImgDetail={this.showImgDetail.bind(this)} />
  }
  render() {
    return this.state.userInfo.pid ? (
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
        <ImgDetail hideImgDetail={this.hideImgDetail.bind(this)} imgDetailVis={this.state.imgDetailVis} openImg={this.state.openImg} openImgArr={this.state.openImgArr} />
      </View>
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Icon2 name="speaker-notes-off" size={40} color="#333" />
          <Text>暂无另一半，快去寻找另一半吧</Text>
        </View >
      )
  }
}