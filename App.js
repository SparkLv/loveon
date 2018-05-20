import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Start from './pages/start/index'
import Home from './pages/home/index'
import Chat from './pages/chat/index'
import AddChat from './common/components/addChat'
import Mine from './pages/mine/index'

const styles = StyleSheet.create({
  tabBarImage: {
    width: 24,
    height: 24,
  }
});

const ChatIndex = createStackNavigator({
  Chat: { screen: Chat },
  AddChat: { screen: AddChat },
}, {
    navigationOptions: {
      header: null,
    }
  });

ChatIndex.navigationOptions = {
  tabBarIcon: (active) => <Image
    style={styles.tabBarImage}
    source={active.focused ? require('./assets/achat.png') : require('./assets/chat.png')}
  />
}

const Nav = createBottomTabNavigator({
  Home,
  ChatIndex,
  Mine
}, {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#fff'
      }
    }
  })

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0
    }
  }
  closeStart() {
    this.setState({
      type: 1
    })
  }
  render() {
    return (
      this.state.type ?
        <Nav /> :
        <Start close={this.closeStart.bind(this)}></Start>
    )
  }
}
