import React, {Component} from 'react';
import {Switch, Text, View} from "react-native";

class DarkmodeSwitch extends Component {
    render() {
        return (
            <View>
                <Text>{this.state.switchValue ? console.log(this.state.switchValue, 'ON') : console.log(this.state.switchValue, 'OFF')}</Text>
                <Switch
                    value={this.state.switchValue}
                    onValueChange ={(switchValue)=>this.setState({switchValue})}/>
            </View>
        );
    }
}

export default DarkmodeSwitch;