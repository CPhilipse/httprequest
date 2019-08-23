import AsyncStorage from '@react-native-community/async-storage';

const helpers = {
    checkUser: function(data, name){
        //if email && password is equal to the data in data than pass on a token to this user.
        let itemsToIterate = data.slice(0).reverse();

        for (let i = 0, len = itemsToIterate.length; i < len; i++) {
            // let check_password = itemsToIterate[i].password; bcrypt.compare....
            let check_name = itemsToIterate[i].name;
            if (check_name === name) {
            //     this.setState({loggedIn: true});
            //     this.props.navigation.navigate('Login');
                console.log('Correct name.')
            } else {
                console.log('Incorrect name.')
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
    // validateUser: async function (email, password) {
    //     try {
    //         const response = await fetch('http://ip:3000/login', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "email": email,
    //             "password": password
    //         })
    //     });
    //         const data = await response.json();
    //         // console.log(JSON.stringify(response.access_token), 'TEST');
    //         await AsyncStorage.setItem('jwt', JSON.stringify(data.access_token));
    //         const getToken = await AsyncStorage.getItem('jwt');
    //         // console.log('test' + getToken);
    //         // return getToken === null ? 'No token' : 'Token: ' + getToken
    //         // await console.log('Token: ', token);
    //         await console.log('Success! You have a protected route.' + 'The token: ' + getToken);
    //     } catch(e) {
    //         console.log(e);
    //     }
    // },
    // authenticateUser: async function () {
    //     try {
    //         await AsyncStorage.getItem('jwt', (err, token) => {
    //             const getValue = async () => {
    //                 await fetch('http://ip:3000/profile', {
    //                     method: 'GET',
    //                     headers: {
    //                         Accept: 'application/json',
    //                         Authorization: 'Bearer ' + token
    //                     }
    //                         .then((response) => console.log(response.json()))
    //                         .then(serverResponse => console.warn(serverResponse))
    //                         // .then((responseJson) => {
    //                         //     this.setState({
    //                         //         secret: responseJson.secret,
    //                         //         data: JSON.stringify(responseJson)
    //                         //     })
    //                         // })
    //                         // .then(console.log('Data: ', this.state.data, 'secret: ', this.state.secret))
    //                         .catch(() => {
    //                             alert('There was an error fetching the secret info.')
    //                         })
    //                 });
    //             };
    //             return getValue();
    //         });
    //     } catch(e) {
    //         console.log(e)
    //     }
    //     console.log('Done.')
    // },
    logoutUser: async function () {
            try {
                const notClearedToken = await AsyncStorage.getItem('jwt');
                console.log('Not cleared token: ' + notClearedToken);
                await AsyncStorage.clear();
                const clearedToken = await AsyncStorage.getItem('jwt');
                alert('You have been logged out.' + clearedToken);
                // this.props.navigation.navigate('Login')
            } catch(e) {
                console.log(e);
            }
            // const clearedToken = await AsyncStorage.getItem('jwt');
            console.log('Done.')
        }
};

export default helpers;