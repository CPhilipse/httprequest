/**
 * @format
 */

import {AppRegistry, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Colors from './src/Colors';

AppRegistry.registerComponent(appName, () => App);

// Style. Cleanes up other files.
export default styles = StyleSheet.create({
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: Colors.black,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
