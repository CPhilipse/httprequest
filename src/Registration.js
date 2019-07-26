import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class Registration extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            // isLoading is used to show Activity loading indicator while loading data from server.
            isLoading: true,
            name: '',
            email: '',
            password: ''
        }
    }

    async handleRegistration(){
        console.log(this.state.name);
        await fetch('http://my_ip:3000/newUser', {
            method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
            headers: "content-type": "application/json", // You can specify your requisition headers here. That line is optional.
            body: JSON.stringify({ // Here's the fun part. Put your data here.
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            });
        })
        .then(response => response.json())
        .then(serverResponse => console.warn(serverResponse))
        .catch((error) => console.warn(error))
    }

    // handleRegi = () => {
    //     console.log(this.state.name, this.state.email, this.state.password);
    //     this.handleRegistration();
    // };

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
                    onPress={() => this.handleRegistration()}
                >
                    <Text style={styles.buttonText}>Registreren</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
