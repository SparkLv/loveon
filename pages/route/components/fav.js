import { createStackNavigator } from "react-navigation";
import Fav from "../../fav";
import FavPub from '../../fav/favPub'
import FavLocation from '../../fav/location'

export default createStackNavigator(
    {
        fav: Fav,
        favPub: FavPub,
        favLocation: FavLocation
    },
    {
        initialRouteName: "fav",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#1b82d1"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {}
        }
    }
);