import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, AsyncStorage, FlatList, Dimensions, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", position: 'relative' }}>

      </View>
    );
  }
}
