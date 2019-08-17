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
    validateUser: function (email, password) {
        fetch('http://ip:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then(response => response.json())
            .catch((error) => console.warn(error))
    }
};

export default helpers;