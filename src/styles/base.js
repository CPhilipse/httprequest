import {StyleSheet, Dimensions} from 'react-native'
import Colors from "./Colors";

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
};

export const colors  = {
    primary: '#226B74',
    secondary: '#254B5A',
    tertiary: '#5DA6A7'
};

export const darkBackgroundColor = {
    flex: 1,
    backgroundColor: Colors.black,
};

export const backgroundColor = {
    flex: 1,
    backgroundColor: Colors.white,
};

export const padding = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40
};

export const fonts = {
    sm: 12,
    md: 18,
    lg: 28,
    primary: 'Cochin'
};