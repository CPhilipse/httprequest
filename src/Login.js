import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import helpers from './Helpers';
import Profile from './Profile';
import AsyncStorage from "@react-native-community/async-storage";

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

    validateUser = async  (email, password) => {
        try {
            const response = await fetch('http://ip:3000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });
            const data = await response.json();
            // console.log(JSON.stringify(response.access_token), 'TEST');
            await AsyncStorage.setItem('jwt', JSON.stringify(data.access_token));
            const getToken = await AsyncStorage.getItem('jwt');
            // console.log('test' + getToken);
            // return getToken === null ? 'No token' : 'Token: ' + getToken
            // await console.log('Token: ', token);
            await console.log('Success! You have a protected route.' + 'The token: ' + getToken);
            await this.props.navigation.navigate('Profile')
        } catch(e) {
            console.log(e);
        }
    };

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
                    onPress={() => this.validateUser(this.state.email, this.state.password)}
                    // onPress={() => helpers.validateUser(this.state.email, this.state.password)}
                >
                    <Text style={styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}