import React, {Fragment} from 'react';

import Home from './screens/Home';
import Registration from './screens/Registration';
import Login from './screens/Login';
import Profile from './screens/Profile';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return <AppContainer/>;
    }
}

const AppNavigator = createStackNavigator({
    Login: {
      screen: Login
    },
    Registration: {
      screen: Registration
    },
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    }
},
{
  headerMode: 'none',
}, { initialRouteName: Registration });

const AppContainer = createAppContainer(AppNavigator);


