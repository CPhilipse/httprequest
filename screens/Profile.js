import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import helpers from './Helpers';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: '',
            secret: null,
            loggedIn: false,
            userName: ''
        }
    }
    // Switch option only on profile.
    // Show email and name.
    // Show that you are logged in.
    // Show logout button.

    componentDidMount = async () => {
            try {
                const getToken = await AsyncStorage.getItem('jwt');
                const response = await fetch('http://192.168.0.117:3000/profile', {
                    method: 'GET',
                    // When token is not valid, Unauthorized will be logged.
                    headers: {
                        Accept: 'application/json',
                        // Template literals. String in a string, you can also do 'Bearer ' + getToken
                        Authorization: `Bearer ${getToken}`
                    }
                });
                // Token signed to this id, OK give this user access.
                const data = await response.json();
                const user = await JSON.stringify(data);
                await console.log(user);
                const name = await JSON.stringify(data.name);
                await this.setState({userName: name});

                //   Save loggedIn in local storage, on logout, empty loggedIn so it become false again.
                // this.setState({loggedIn: true})
            } catch (err) {
                console.log(err)
            }
        };

    render() {
        return (
            <View>
                <Text>Hello {this.state.userName}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => helpers.logoutUser() && this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}