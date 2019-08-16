import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            loggedIn: false,
            data: ['']
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
            .then(serverResponse => console.warn(serverResponse))
            .catch((error) => console.warn(error))
    };

    // handleLogin = () => {
    //     console.log(this.state.data);
    // };

    // async handleLogin(){
    //     await fetch('http://ip:3000/users', {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(response => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 data: JSON.stringify(responseJson)
    //             });
    //         })
    //         .then(serverResponse => console.warn(serverResponse))
    //         .catch((error) => console.warn(error))
    // }

    checkUser () {
        //if email && password is equal to the data in data than pass on a token to this user.
        let itemsToIterate = this.state.data.slice(0).reverse();

        for (let i = 0, len = itemsToIterate.length; i < len; i++) {
            let email = itemsToIterate[i].email;
            if (email === this.state.email) {
                this.setState({loggedIn: true});
                this.props.navigation.navigate('Login');
            }
            console.log(user);
        }
    }

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
                    onPress={() => this.checkUser()}
                >
                    <Text style={styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
                {/*<Text>{this.state.data}</Text>*/}
            </View>
        );
    }
}