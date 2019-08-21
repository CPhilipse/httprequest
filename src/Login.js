import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import helpers from './Helpers';
import Profile from './Profile';

export default class Login extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            loggedIn: false,
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={'Email'}
                    value={this.state.email}
                />
                <TextInput
                    style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={'Wachtwoord'}
                    value={this.state.password}
                    secureTextEntry={true}
                    password={true}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => helpers.validateUser(this.state.email, this.state.password)}
                >
                    <Text style={styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}