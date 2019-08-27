const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const CONFIG        = require('./config');
const bcrypt = require('bcryptjs');
const  jwt  =  require('jsonwebtoken');
// const { ExtractJwt, Strategy } = require('passport-jwt');
const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;


const db = mysql.createPool({
    connectionLimit : CONFIG.db_connectionlimit,
    host            : CONFIG.db_host,
    user            : CONFIG.db_user,
    password        : CONFIG.db_password,
    database        : CONFIG.db_name
});

const  findUserByEmail  = (email, cb) => {
    return db.getConnection(function(err) {
        if (err) throw err;
        console.log("Connected! (findUserByEmail function)");
        db.query('SELECT * FROM users WHERE email = ?',[email], (err, row) => {
            cb(err, row)
        });
    });
};

const  findUserById  = (id, cb) => {
    return db.getConnection(function(err) {
        if (err) throw err;
        console.log("Connected! (findUserById function)");
        db.query('SELECT * FROM users WHERE id = ?',[id], (err, row) => {
            cb(err, row)
        });
    });
};

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.secret_key;

// Problem with strategy?
// lets create our strategy for web token
// * Why does it return an empty user?
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next, callback) {
    console.log('Payload received', jwt_payload.id);
    // Find the id (user) in the payload. Return this user.
    findUserById(jwt_payload.id, function (err, user) {
        console.log(user[0], '|', jwt_payload.id);
        if (user[0]) {
            next(null, user[0]);
        } else {
            next(null, false);
        }
    });

    // findUserByEmail({email: jwt_payload.email}, function (res) {
    //     // let user = res;
    //     // delete user.password;
    //     callback(null, res);
    //     // callback(null, user);
    // }, function (err) {
    //     return callback(err, false);
    // });
});

// use the strategy
passport.use(strategy);

// Initializing our app.
const app = express();
// initialize passport with express
app.use(passport.initialize());

// Using Express and bodyParser.
app.use(bodyParser.json());
app.use(express.json());

// Debug, show request log.
app.use((req, res, next) => {
    console.log('%O', res);
    next();
});

const  createUser  = (user, cb) => {
    return db.getConnection(function(err) {
        if (err) throw err;
        console.log("Connected! (createUser function)");

        db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
            cb(err)
        });
    });
};

// Creating a POST route that will INSERT a new User on the 'users' table from a MySQL database.
app.post('/newCustomer', function(req, res, next)
{
    if (!req.body.email || !req.body.password) {
        res.status(400).json({success: false, message: 'Please enter email and password.'});
    } else {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const  name  =  req.body.name;
    const  email  =  req.body.email;
    // const SECRET_KEY = CONFIG.secret_key;

    //    When Login, it always says 'Unauthorized'. Why?
    createUser([name, email, hash], (err) => {
        if (err) return  res.status(500).send("Server error!");
        findUserByEmail(email, (err, user) => {
            if (err) return  res.status(500).send('Server error!');
            // const expiresIn = 24 * 60 * 60;
            // const accessToken = jwt.sign({ email: user.email }, SECRET_KEY, {
            //     expiresIn:  expiresIn
            // });
            // res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn
            // });
        });
    });
    }
});

app.post('/login', (req, res) => {
    const  email  =  req.body.email;
    const SECRET_KEY = CONFIG.secret_key;

    findUserByEmail(email, (err, user) => {
        //+
        // console.log(user[0].id, 'user: ' + user[0], user);
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        // console.log(user[0].password);
        const  result  =  bcrypt.compareSync(req.body.password, user[0].password);
        if (!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        console.log('User email: ' + user[0].email, 'User ID: ' + user[0].id);
        // Create token and specify the data in the payload
        // User is found based on the req email, take the id of this user and identify the user by the id.
        // const payload = {email: user[0].email};
        const payload = {id: user[0].id};
        const  accessToken  =  jwt.sign(payload, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        // Token is given to the right user and token isn't expired.
        jwt.verify(accessToken, SECRET_KEY, (errs, data) => {
          console.log(errs, data);
        });
        // console.log(user, accessToken, expiresIn);
        // To fetch the data shown below, grab the key names.
        res.status(200).json({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
        console.log('Succesful validation of the user.' + accessToken)
    });
});

// Get user when authenticated.
// generate a signed json web token with the contents of user object and return it in the response
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        // `req.user` contains the authenticated user.
        console.log('It works.', req.user.id);
        // It seems that this res is not being send.
        res.send(req.user);
    }
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/users', function (req, res)
{
    db.getConnection(function(err, connection) {
        if (err) throw err;
        console.log("Connected!");
        // let sql = `CREATE TABLE test (tname VARCHAR(255), taddress VARCHAR(255))`;
        db.query("SELECT * FROM users", function (err, results) {
            // End connection.
            connection.release();
            if (err) throw err;
            // Sending our response code.
            res.send(results);
        });
    });
});

// Start our server.
app.listen(CONFIG.port, () => {
    console.log('Server is running on http://localhost:3000!');
});