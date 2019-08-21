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
            secret: null
        }
    }

    // componentDidMount = () => {
    //     this.helpers._fetchData();
    // };

    // componentDidMount  () {
    //     helpers.authenticateUser();
    //
    // };

    componentDidMount = async () => {
            try {
                const token = await AsyncStorage.getItem('jwt');
                console.log('Token: ', token);
                const response = await fetch('http://ip:3000/profile', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                });
                // console.log('3', await JSON.stringify(response.json()));
                return await response.json();
            } catch (err) {
                console.log("Error: ", err)
            }
        };

    // _fetchData = () => {
    //     AsyncStorage.getItem('jwt', (err, token) => {
    //         fetch('http://ip:3000/profile', {
    //             headers: {
    //                 Accept: 'application/json',
    //                 Authorization: 'JWT ' + {token} + ''
    //             }
    //         })
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 this.setState({
    //                     secret: json.secret,
    //                     data: JSON.stringify(json)
    //                 })
    //             })
    //             .then(console.log('Data: ', this.state.data, 'secret: ', this.state.secret))
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