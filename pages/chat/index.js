import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import HeadBar from '../../common/components/headBar';
export default class Chat extends Component {
  static navigationOptions = {
    tabBarIcon: (active) => <Image
      style={styles.tabBarImage}
      source={active.focused ? require('../../assets/achat.png') : require('../../assets/chat.png')}
    />
  }
  componentDidMount() {
    // setTimeout(()=>{this.props.navigation.goBack()},2000);
  }
  showAdd() {
    this.props.navigation.navigate('AddChat')
  }
  render() {
    return (
      <View>
        <HeadBar bgColor="#3d82cb" title="Chat" oper={<TouchableOpacity onPress={() => this.showAdd.call(this)}><Image style={styles.addBtn} source={require('../../assets/add.png')} /></TouchableOpacity>} />
        <Text>sss</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarImage: {
    width: 24,
    height: 24,
  },
  addBtn: {
    width: 30,
    height: 30
  }
});