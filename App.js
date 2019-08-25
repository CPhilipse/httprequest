import React, {Fragment} from 'react';

import Home from './src/Home';
import Registration from './src/Registration';
import Login from './src/Login';
import Profile from './src/Profile';

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
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


