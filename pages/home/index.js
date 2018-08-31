import React, { Component } from "react";
import { View, StatusBar, Button } from "react-native";
import md5 from "md5";
import JPush from 'jpush-react-native';
import store from '../../store'
import { NavigationActions } from 'react-navigation';

import AddPartner from './components/addPartner'
import MessageEnter from './components/messageEnter'

import AddModal from './components/addModal'

import MenuBar from './components/MenuBar'

import Ajax from "../../common/ajax";

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MessageEnter userInfo={navigation.getParam("userInfo")} enterMsg={() => { navigation.navigate('message') }} />,
      headerRight: <AddPartner userInfo={navigation.getParam("userInfo")} pData={navigation.getParam('pData')} enterFav={() => { navigation.navigate('fav') }} showBox={navigation.getParam("showAddBox")} />
    };
  };
  constructor() {
    super();
    this.state = {
      addBoxVis: false,
      userInfo: store.getState().userInfo,
      pData: store.getState().pUserInfo
    };
    this.gotoMsgBind = this.gotoMsg.bind(this);
  }
  componentDidMount() {
    JPush.addReceiveOpenNotificationListener(this.gotoMsgBind);
    this.props.navigation.setParams({
      showAddBox: this.showAddBox.bind(this),
      pData: this.state.pData,
      userInfo: this.state.userInfo
    });
  }
  componentWillUnmount() {
    JPush.removeReceiveOpenNotificationListener(this.gotoMsgBind);
  }
  gotoMsg() {
    this.props.navigation.navigate('message');
  }
  getLoc() {
    navigator.geolocation.getCurrentPosition(info => {
    });
  }
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={this.props.navigation.state.routeName == 'cover' ? "#fff" : "#1b82d1"} />
        <MenuBar navigation={this.props.navigation} />
        <AddModal toLogin={() => {
          const navigateAction = NavigationActions.navigate({
            routeName: 'login',
            params: {},

            // navigate can have a nested navigate action that will be run inside the child router
            action: NavigationActions.navigate({ routeName: 'cover' }),
          });
          this.props.navigation.dispatch(navigateAction);
        }} hideAddBox={this.hideAddBox.bind(this)} userInfo={this.state.userInfo} addBoxVis={this.state.addBoxVis} />
      </View>
    );
  }
}
