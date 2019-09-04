import AsyncStorage from '@react-native-community/async-storage';
import styles from "./styles/style";

const helpers = {
    lookForSomething: function(data, something){
        let itemsToIterate = data.slice(0).reverse();

        for (let i = 0, len = itemsToIterate.length; i < len; i++) {
            let check_something = itemsToIterate[i].something;
            if (check_something === something) {
                console.log('Correct something.')
            } else {
                console.log('Incorrect something.')
            }
        }
    },
     handleRegistration: async function(name, email, password) {
        await fetch('http://ip:3000/newCustomer', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    })
        .then(response => response.json())
        .then(serverResponse => console.warn(serverResponse))
        .catch((error) => console.warn(error))
    },
    logoutUser: async function () {
            try {
                // Remove token and redirect to login. It expires automatically after one day, how to change expiration date to one sec to make it invalid?
                await AsyncStorage.removeItem('jwt');
            } catch(e) {
                console.log(e);
            }
            console.log('Logged out.')
        },
    lightMode: function () {
        const textInput = styles.inputText;
        const button = styles.button;
        const buttonText = styles.buttonText;
        const differText = styles.differText;
        const differNote = styles.differNote;
        const formTitle = styles.formTitle;
        const formNote = styles.formNote;
        const background = styles.backgroundColor;
    },
    darkMode: function () {
        const textInput = styles.darkinputText;
        const button = styles.darkbutton;
        const buttonText = styles.darkbuttonText;
        const differText = styles.darkdifferText;
        const differNote = styles.darkdifferNote;
        const formTitle =  styles.darkformTitle;
        const formNote = styles.darkformNote;
        const background = styles.darkbackgroundColor;
    }
};

export default helpers;