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
                        // Template literals. String in a string, otherwise you'd have to do 'Bearer ' + getToken
                        Authorization: `Bearer ${getToken}`
                    }
                });
                console.log('Before response');
                // Error is because of the .json. I get a response, but I don't seem to be able to get the body of the response through .json.
                // JSON.parse(response) ERROR => SyntaxError: Unexpected token o in JSON at position 1
                // JSON.stringify(response) shows me the response in a string. But how do I get to the hidden body of the response?

                const data = await response.text();
                console.log('After response: ' + data);
                // if (Object.getOwnPropertyNames(data).length > 0) return console.log('False');
                // for (let headers in data) { if (data.hasOwnProperty(headers))  return console.log('false'); }
                // for(let property in data) {
                //     console.log(property + "=" + data[property]);
                // }

                // this.setState({loggedIn: true})
            } catch (err) {
                console.log(err)
            }
        };

    // _fetchData = () => {
    //     AsyncStorage.getItem('jwt', (err, token) => {
    //         fetch('http://ip:3000/profile', {
    //             headers: {
    //                 Accept: 'application/json',
    //                 Authorization: 'Bearer ' + token + ''
    //             }
    //         })
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 this.setState({
    //                     secret: json.secret,
    //                     data: JSON.stringify(json)
    //                 })
    //             })
    //             .then((response) => response.status === 201 ? alert("sign up successfully!!!") : alert("fail signup already exist user"))
    //             .catch(() => {
    //                 alert('There was an error fetching the secret info.')
    //             })
    //     })
    // };

    render() {
        return (
            <View>
                <Text>Hello {this.state.data + ' | Secret key: ' + this.state.secret}</Text>
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