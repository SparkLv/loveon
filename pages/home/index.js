import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import Com from '../../common/common';

export default class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Home Screen</Text>
        </View>
    );
  }
}
