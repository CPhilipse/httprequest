// ... are Spread Attributes. It allows an expression to be expanded. So to add all the parameters from the expression.
// Style. Cleanes up other files.
import {StyleSheet} from "react-native";
import {
    buttonText, formTitle, inputText, differText, formNote, differNote, touchableView,
    darkbuttonText, darkinputText, darkdifferText, darkdifferNote, darkformTitle, darkformNote, whiteColor, darkColor
} from "./Text";
import {darkformButton, formButton} from "./Buttons";
import {darkBackgroundColor, backgroundColor} from './base';

export default styles = StyleSheet.create({
    backgroundColor: {
        ...backgroundColor
    },
    buttonText: {
        ...buttonText
    },
    button: {
        ...formButton
    },
    inputText: {
        ...inputText
    },
    formTitle: {
        ...formTitle
    },
    differText: {
        ...differText
    },
    formNote: {
        ...formNote
    },
    differNote: {
        ...differNote
    },
    touchableView: {
        ...touchableView
    },

    darkColor: {
        ...darkColor
    },
    whiteColor: {
        ...whiteColor
    },
//    Dark mode
    darkbackgroundColor: {
        ...darkBackgroundColor
    },
    darkbuttonText: {
        ...darkbuttonText
    },
    darkbutton: {
        ...darkformButton
    },
    darkinputText: {
        ...darkinputText
    },
    darkformTitle: {
        ...darkformTitle
    },
    darkdifferText: {
        ...darkdifferText
    },
    darkdifferNote: {
        ...darkdifferNote
    },
    darkformNote: {
        ...darkformNote
    }
});