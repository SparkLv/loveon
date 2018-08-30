import { createStackNavigator } from "react-navigation";
import Home from "../../home";

export default createStackNavigator(
    {
        home: Home,
    },
    {
        initialRouteName: "home",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#1b82d1"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {}
        }
    }
);