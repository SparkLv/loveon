import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import Cover from "./cover";

import Home from "./home";

import Info from "./info";

import Add from "./add";

import Fav from "./fav";

import More from "./more";

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Details",
      headerRight: <Button onPress={() => alert("This is a button!")} title="Info" />,
      headerLeft: <Button onPress={() => navigation.navigate("MyModal")} title="Info" color="#fff" />
    };
  };
  render() {
    const { navigation } = this.props;
    const a = navigation.getParam("a", "mei you zhi");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{a}</Text>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    home: {
      screen: Home
    },
    detail: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: "home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#6b52ae"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {}
    }
  }
);

const BottomTab = createBottomTabNavigator(
  {
    home: Home,
    info: Info,
    add: Add,
    fav: Fav,
    more: More
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let Img = null;
        switch (routeName) {
          case "home":
            Img = focused ? <Image style={styles.iconSize} source={require("../assets/icons/home-active.png")} /> : <Image style={styles.iconSize} source={require("../assets/icons/home.png")} />;
            break;
          case "info":
            Img = focused ? <Image style={styles.iconSize} source={require("../assets/icons/info-active.png")} /> : <Image style={styles.iconSize} source={require("../assets/icons/info.png")} />;
            break;
          case "add":
            Img = focused ? <Image style={styles.iconSizeC} source={require("../assets/icons/add-active.png")} /> : <Image style={styles.iconSizeC} source={require("../assets/icons/add.png")} />;
            break;
          case "fav":
            Img = focused ? <Image style={styles.iconSize} source={require("../assets/icons/fav-active.png")} /> : <Image style={styles.iconSize} source={require("../assets/icons/fav.png")} />;
            break;
          case "more":
            Img = focused ? <Image style={styles.iconSize} source={require("../assets/icons/more-active.png")} /> : <Image style={styles.iconSize} source={require("../assets/icons/more.png")} />;
            break;
        }
        return Img;
      },
      tabBarOptions: {
        showLabel: false
      }
    })
  }
);

const RootStack = createStackNavigator(
  {
    cover: {
      screen: Cover
    },
    Main: {
      screen: BottomTab
    }
  },
  {
    mode: "card",
    headerMode: "none"
  }
);

export default RootStack;

const styles = StyleSheet.create({
  iconSize: {
    width: 20,
    height: 20
  },
  iconSizeC: {
    width: 30,
    height: 30
  }
});
