import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput, Switch
} from 'react-native';
import helpers from './Helpers';
import Profile from './Profile';
// import {toggle, textInput} from "./Registration";
import styles from './styles/style';
import AsyncStorage from "@react-native-community/async-storage";

export default class Login extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            loggedIn: false,
            email: '',
            password: '',
            switchValue: true,
        }
    }

    validateUser = async  (email, password) => {
        try {
            const response = await fetch('http://ip:3000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });
            const data = await response.json();
            // console.log(JSON.stringify(response.access_token), 'TEST');
            await AsyncStorage.setItem('jwt', JSON.stringify(data.access_token));
            const getToken = await AsyncStorage.getItem('jwt');
            // console.log('test' + getToken);
            // return getToken === null ? 'No token' : 'Token: ' + getToken
            // await console.log('Token: ', token);
            await console.log('Success! You have a protected route.' + 'The token: ' + getToken);
            await this.props.navigation.navigate('Profile')
        } catch(e) {
            console.log(e);
        }
    };

    render() {
        const toggle = this.state.switchValue;
        const textInput = toggle === true ? styles.inputText : styles.darkinputText;
        const button = toggle === true ? styles.button : styles.darkbutton;
        const buttonText = toggle === true ? styles.buttonText : styles.darkbuttonText;
        const differText = toggle === true ? styles.differText : styles.darkdifferText;
        const differNote = toggle === true ? styles.differNote : styles.darkdifferNote;
        const formTitle =  toggle === true ? styles.formTitle : styles.darkformTitle;
        const formNote = toggle === true ? styles.formNote : styles.darkformNote;
        const background = toggle === true ? styles.backgroundColor : styles.darkbackgroundColor;
        return (
            <View style={background}>
                <Text>{this.state.switchValue ? console.log(this.state.switchValue, 'ON') : console.log(this.state.switchValue, 'OFF')}</Text>
                <Switch
                    value={this.state.switchValue}
                    onValueChange ={(switchValue)=>this.setState({switchValue})}/>

                <Text style={formTitle}>Log into your <Text style={differText}>Account</Text></Text>
                <TextInput
                    style={textInput}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={'Email'}
                    placeholderTextColor={toggle === true ? "#444" : "white"}
                    value={this.state.email}
                />
                <TextInput
                    style={textInput}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={'Password'}
                    placeholderTextColor={toggle === true ? "#444" : "white"}
                    value={this.state.password}
                    secureTextEntry={true}
                    password={true}
                />

                <TouchableOpacity
                    style={button}
                    onPress={() => this.validateUser(this.state.email, this.state.password)}
                    // onPress={() => helpers.validateUser(this.state.email, this.state.password)}
                >
                    <Text style={buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.touchableView}>
                    <Text style={formNote}>No account yet? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}>
                        <Text style={differNote}>Create one!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}