// ... are Spread Attributes. It allows an expression to be expanded. So to add all the parameters from the expression.
// Style. Cleanes up other files.
import {StyleSheet} from "react-native";
import {darkbuttonText, formTitle, darkinputText, darkdifferText, formNote, darkdifferNote, touchableView} from "./Text";
import {darkformButton} from "./Buttons";

export default styles = StyleSheet.create({
    buttonText: {
        ...darkbuttonText
    },
    button: {
        ...darkformButton
    },
    inputText: {
        ...darkinputText
    },
    formTitle: {
        ...formTitle
    },
    differText: {
        ...darkdifferText
    },
    formNote: {
        ...formNote
    },
    differNote: {
        ...darkdifferNote
    },
    touchableView: {
        ...touchableView
    }
});