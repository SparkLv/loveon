import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, FlatList, WebView } from "react-native";

export default class Detail extends Component {
  render() {
    const url = this.props.navigation.getParam("url");
    return <WebView source={{ uri: url }} />;
  }
}
