import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './home';
import MoreStack from './more';

export default createBottomTabNavigator(
    {
        home: HomeStack,
        more: MoreStack
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let Img = null;
                switch (routeName) {
                    case "home":
                        Img = <Icon name={`home${focused ? '' : '-outline'}`} size={30} color={tintColor} />;
                        break;
                    // case "message":
                    //     Img = <Icon name={`comment${focused ? '' : '-outline'}`} size={30} color={tintColor} />;
                    //     break;
                    // case "fav":
                    //     Img = <Icon name={`heart${focused ? '' : '-outline'}`} size={30} color={tintColor} />;
                    //     break;
                    case "more":
                        Img = <Icon name={`account${focused ? '' : '-outline'}`} size={30} color={tintColor} />;
                        break;
                }
                return Img;
            },
            tabBarOptions: {
                showLabel: false,
                activeTintColor: '#333',
                inactiveTintColor: '#333'
            }
        })
    }
);