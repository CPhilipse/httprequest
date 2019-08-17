import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import helpers from './Helpers';

export default class Profile extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            data: ''
        }
    }

    componentDidMount() {
        fetch('http://ip:3000/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(responseJson => this.setState({
                data: responseJson
            }))
            .then(test => console.log(test, this.state.data))
            .catch((error) => console.warn(error))
    };

    render() {
        return (
            <View>
                <Text>Hello {this.state.data}</Text>
            </View>
        );
    }
}