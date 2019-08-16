import React, {Fragment} from 'react';

import Home from './src/Home';
import Registration from './src/Registration';
import Login from './src/Login';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
  }
},
{
  headerMode: 'none',
}, { initialRouteName: Home });

const AppContainer = createAppContainer(AppNavigator);


