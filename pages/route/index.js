import { createStackNavigator } from "react-navigation";
import Cover from "../start/cover";
import Login from '../start/login';
import Register from '../start/register';

import BottomTab from './components/bottom';

import Fav from '../home/components/fav';
import FavPub from '../home/components/fav/favPub';
import FavLocation from '../home/components/fav/location';
import Message from '../home/components/message';
import FullScreenMovie from '../home/components/movie/fullScreenMovie';

export default createStackNavigator(
  {
    cover: Cover,
    login: Login,
    register: Register,
    main: {
      screen: BottomTab,
      navigationOptions: ({ navigation }) => ({
        header: null,
      })
    },

    fav: Fav,
    favPub: FavPub,
    favLocation: FavLocation,
    message: Message,
    fullScreenMovie: FullScreenMovie
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#1b82d1"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {}
    }
  }
);
