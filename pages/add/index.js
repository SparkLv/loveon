import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

export default class Add extends Component {
  componentDidMount() {
    // console.log(ImagePicker);
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    // });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>add Screen</Text>
      </View>
    );
  }
}
