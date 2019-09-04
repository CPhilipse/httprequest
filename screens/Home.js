import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Registration from './Registration';
import Login from './Login';
import styles from './styles/style';

export default class Home extends Component {
    render() {
        return (
            <View>
                <Text>Hai, this is the home screen.</Text>
                {/*<TouchableOpacity*/}
                {/*    style={styles.button}*/}
                {/*    onPress={() => this.props.navigation.navigate('Registration')}*/}
                {/*>*/}
                {/*    <Text style={styles.buttonText}>Registreren</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*    style={styles.button}*/}
                {/*    onPress={() => this.props.navigation.navigate('Login')}*/}
                {/*>*/}
                {/*    <Text style={styles.buttonText}>Inloggen</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        );
    }
}