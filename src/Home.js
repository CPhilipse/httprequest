import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Registration from './Registration';

export default class Home extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Registration')}
                >
                    <Text style={styles.buttonText}>Registreren</Text>
                </TouchableOpacity>
            </View>
        );
    }
}