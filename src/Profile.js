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
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            data: '',
            secret: null,
            loggedIn: false,
            userName: ''
        }
    }

    componentDidMount = async () => {
            try {
                const getToken = await AsyncStorage.getItem('jwt');
                console.log('Profile token: ', getToken + '|', `Bearer ${getToken}`);
                const response = await fetch('http://ip:3000/profile', {
                    method: 'GET',
                    // When token is not valid, Unauthorized will be logged.
                    headers: {
                        Accept: 'application/json',
                        // Template literals. String in a string, you can also do 'Bearer ' + getToken
                        Authorization: `Bearer ${getToken}`
                    }
                });
                console.log('Before response');
                // Token signed to this id, OK give this user access.
                const data = await response.json();
                // for(let property in data) {
                //     console.log(property + "=" + data[property]);
                // }
                // const middle = JSON.parse(JSON.stringify(data));
                console.log('Response: ' + JSON.stringify(data), JSON.stringify(data.name));
                const user = JSON.stringify(data);
                const name = JSON.stringify(data.name);
                await this.setState({userName: name});
                console.log(this.state.userName);

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
                    onPress={() => helpers.logoutUser()}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}