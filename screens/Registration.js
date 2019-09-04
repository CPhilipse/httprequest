import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Switch
} from 'react-native';
import helpers from './Helpers';
import styles from './styles/style';

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            name: '',
            email: '',
            password: '',
            switchValue: true
        }
    }

    render() {
        // Put Switch at one place. Save the toggle state in a local storage, update storage item every time it's being toggled.
        // What to do with these consts? Make 'm global? Since switchValue state will be stored, toggle const is where you
        // getItem the value of the switch. Then you can make the other constants global (export) and import them from everywhere.
        // const toggle = this.state.switchValue;
        // const textInput = toggle === true ? styles.inputText : styles.darkinputText;
        // const button = toggle === true ? styles.button : styles.darkbutton;
        // const buttonText = toggle === true ? styles.buttonText : styles.darkbuttonText;
        // const differText = toggle === true ? styles.differText : styles.darkdifferText;
        // const differNote = toggle === true ? styles.differNote : styles.darkdifferNote;
        // const formTitle =  toggle === true ? styles.formTitle : styles.darkformTitle;
        // const formNote = toggle === true ? styles.formNote : styles.darkformNote;
        // const background = toggle === true ? styles.backgroundColor : styles.darkbackgroundColor;
        return (
            // center whole view. Less code by centering every single component.
            <View style={styles.backgroundColor}>
                {/*<Text>{this.state.switchValue ? console.log(this.state.switchValue, 'ON') : console.log(this.state.switchValue, 'OFF')}</Text>*/}
                {/*<Switch*/}
                {/*    value={this.state.switchValue}*/}
                {/*    onValueChange ={(switchValue)=>this.setState({switchValue})}/>*/}
                <Text style={styles.formTitle}>Create an <Text style={styles.differText}>Account</Text></Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(name) => this.setState({name})}
                    placeholder={'Name'}
                    // placeholderTextColor={toggle === true ? "#444" : "white"}
                    placeholderTextColor={"#444"}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={'Email'}
                    // placeholderTextColor={toggle === true ? "#444" : "white"}
                    placeholderTextColor={"#444"}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={'Password'}
                    // placeholderTextColor={toggle === true ? "#444" : "white"}
                    placeholderTextColor={"#444"}
                    value={this.state.password}
                    secureTextEntry={true}
                    password={true}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => helpers.handleRegistration(this.state.name, this.state.email, this.state.password) && this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.touchableView}>
                    <Text style={styles.formNote}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.differNote}>Login.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}