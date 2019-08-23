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
                console.log('Profile token: ', getToken + '|');
                const response = await fetch('http://ip:3000/profile', {
                    method: 'GET',
                    // When token is not valid, Unauthorized will be logged.
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + getToken
                    }
                });
                console.log('Before response');
                const data = await response.json();
                console.log('After response: ' + data);
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