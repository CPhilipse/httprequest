import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import helpers from './Helpers';

export default class Login extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            loggedIn: false,
            data: [''],
            name: '',
            password: ''
        }
    }

    componentDidMount = () => {
       fetch('http://ip:3000/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson
                });
            })
            .then(test => console.log(test, this.state.data))
            .catch((error) => console.warn(error))
    };

    render() {
        return (
            <View>
                <TextInput
                    style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}
                    onChangeText={(name) => this.setState({name})}
                    placeholder={'Naam'}
                    value={this.state.name}
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
                    onPress={() => helpers.checkUser(this.state.data, this.state.name)}
                >
                    <Text style={styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}