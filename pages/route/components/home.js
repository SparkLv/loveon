import { createStackNavigator } from "react-navigation";
import Home from "../../home";
import Movie from '../../home/components/movie'
import MovieDetail from '../../home/components/movie/movieDetail'
import OutWeb from '../../home/components/movie/outWeb'

export default createStackNavigator(
    {
        home: Home,
        movie: Movie,
        movieDetail: MovieDetail,
        outWeb: OutWeb
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