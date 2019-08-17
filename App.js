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
  Home: {
    screen: Home
  },
  Registration: {
    screen: Registration
  },
  Login: {
    screen: Login
  },
    Profile: {
      screen: Profile
    }
},
{
  headerMode: 'none',
}, { initialRouteName: Home });

const AppContainer = createAppContainer(AppNavigator);


