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
            loggedIn: false
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
                // Error is because of the .json. I get a response, but I don't seem to be able to get the body of the response through .json.
                // JSON.parse(response) ERROR => SyntaxError: Unexpected token o in JSON at position 1
                // JSON.stringify(response) shows me the response in a string. But how do I get to the hidden body of the response?

                const data = await response.text();
                console.log('Response: ' + data);
                // if (Object.getOwnPropertyNames(data).length > 0) return console.log('False');
                // for (let headers in data) { if (data.hasOwnProperty(headers))  return console.log('false'); }
                // for(let property in data) {
                //     console.log(property + "=" + data[property]);
                // }

                //   Save loggedIn in local storage, on logout, empty loggedIn so it become false again.
                // this.setState({loggedIn: true})
            } catch (err) {
                console.log(err)
            }
        };

    render() {
        return (
            <View>
                <Text>Hello </Text>
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