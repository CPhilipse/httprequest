const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const CONFIG        = require('./config');
const bcrypt = require('bcryptjs');
const  jwt  =  require('jsonwebtoken');
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

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('Payload received', jwt_payload.id);
    // Find the id (user) in the payload. Return this user.
    findUserById(jwt_payload.id, function (err, user) {
        if (user[0]) {
            next(null, user[0]);
        } else {
            next(null, false);
        }
    });
});

// use the strategy
passport.use(strategy);

// Initializing our app.
const app = express();
// initialize passport with express
app.use(passport.initialize());

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
        console.log("Connected! (createUser)");

        db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
            cb(err)
        });
    });
};

app.post('/newCustomer', function(req, res)
{
    if (!req.body.email || !req.body.password) {
        res.status(400).json({success: false, message: 'Please enter email and password.'});
    } else {
        const name = req.body.name;
        const email = req.body.email;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        createUser([name, email, hash], (err) => {
            if (err) return  res.status(500).send("Server error!");
        });
    }
});

app.post('/login', (req, res) => {
    const  email  =  req.body.email;
    const SECRET_KEY = CONFIG.secret_key;

    findUserByEmail(email, (err, user) => {
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(req.body.password, user[0].password);
        if (!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        // Create token and specify the data in the payload.
        // User is found based on the req email, take the id of this user and identify the user by the id.
        const payload = {id: user[0].id};
        const  accessToken  =  jwt.sign(payload, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        // Check expiration date on the token.
        // jwt.verify(accessToken, SECRET_KEY, (errs, data) => {
        //   console.log(errs, data);
        // });
        // To fetch the data shown below, grab the key names.
        res.status(200).json({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
        console.log('Succesful validation of the user.')
    });
});

// generate a signed json web token with the contents of user object and return it in the response
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        console.log('It works.', req.user.id);
        res.send(req.user);
    }
);

app.get('/users', function (req, res)
{
    db.getConnection(function(err, connection) {
        if (err) throw err;

        db.query("SELECT * FROM users", function (err, results) {
            // End connection.
            connection.release();
            if (err) throw err;
            res.send(results);
        });
    });
});

// Start our server.
app.listen(CONFIG.port, () => {
    console.log('Server is running on http://localhost:3000!');
});