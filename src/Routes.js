const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const CONFIG        = require('./config');
const bcrypt = require('bcryptjs');

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
    console.log('%O', req);
    next();
});

// Creating a POST route that will INSERT a new User on the 'users' table from a MySQL database.
app.post('/newCustomer', function(req, res, next)
{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    db.getConnection(function(err, connection) {
        if (err) throw err;
        console.log("Connected!");
        // let sql = `CREATE TABLE test (tname VARCHAR(255), taddress VARCHAR(255))`;

        db.query("INSERT INTO users (name, email, password) values('"+ req.body.name + "', '"+ req.body.email + "','" + hash + "')", function (err, results) {
            // End connection.
            connection.release();

            if (err) throw err;
            // Sending our response code.
            res.send(JSON.stringify(results));
            console.log("The customer is inserted!!");
        });
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

// app.get('/home', function (req, res) {};

// Start our server.
app.listen(CONFIG.port, () => {
    console.log('Server is running on http://localhost:3000!');
});