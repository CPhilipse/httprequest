const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const CONFIG        = require('./config');
const bcrypt = require('bcryptjs');
const  jwt  =  require('jsonwebtoken');

const db = mysql.createPool({
    connectionLimit : CONFIG.db_connectionlimit,
    host            : CONFIG.db_host,
    user            : CONFIG.db_user,
    password        : CONFIG.db_password,
    database        : CONFIG.db_name
});

// Initializing our app.
const app = express();

// Using Express and bodyParser.
app.use(bodyParser.json());
app.use(express.json());

// Debug, show request log.
app.use((req, res, next) => {
    console.log('%O', req.body);
    next();
});

const  findUserByEmail  = (email, cb) => {
   return db.getConnection(function(err, connection) {
        if (err) throw err;
        console.log("Connected!");
        db.query('SELECT * FROM users WHERE email = ?',[email], (err, row) => {
            cb(err, row)
        });
    });
}

const  createUser  = (user, cb) => {
    return db.getConnection(function(err, connection) {
        if (err) throw err;
        console.log("Connected!");

        db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
            cb(err)
        });
    });
}

// Creating a POST route that will INSERT a new User on the 'users' table from a MySQL database.
app.post('/newCustomer', function(req, res, next)
{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const  name  =  req.body.name;
    const  email  =  req.body.email;
    const SECRET_KEY = CONFIG.secret_key;

    createUser([name, email, hash], (err) => {
        if (err) return  res.status(500).send("Server error!");
        findUserByEmail(email, (err, user) => {
            if (err) return  res.status(500).send('Server error!');
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn
            });
        });
    });
});

app.post('/login', (req, res) => {
    const  email  =  req.body.email;
    const  password  =  req.body.password;
    const SECRET_KEY = CONFIG.secret_key;

    findUserByEmail(email, (err, user) => {
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        // console.log(user[0].password);
        const  result  =  bcrypt.compareSync(password, user[0].password);
        if (!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
        console.log('Succesful validation of the user.')
    });
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