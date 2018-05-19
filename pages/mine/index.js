import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import HeadBar from '../../common/components/headBar';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

export default class App extends Component {
  static navigationOptions = {
    tabBarIcon: (active) => <Image
      style={styles.tabBarImage}
      source={active.focused ? require('../../assets/amine.png') : require('../../assets/mine.png')}
    />
  }
  render() {
    return (
      <View>
        <HeadBar bgColor="#3d82cb" title="Mine" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarImage: {
    width: 24,
    height: 24,
  }
});