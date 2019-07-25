const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const db = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'lwpcms',
});

// Initializing our app.
const app = express();

// Using Express and bodyParser.
app.use(bodyParser.json());
app.use(express.json());

// Creating a GET route that return all data from a MySQL table called 'users'.
app.get('/users', function (req, res)
{
    // Connecting to the database.
    db.getConnection(function (err, connection)
    {
        // Checking for errors.
        if(err) throw err;

        // Executing our query.
        connection.query('SELECT * FROM users', function (error, results, fields)
        {
            // Checking for errors.
            if(error) throw error;

            // Sending our results.
            res.send(results)
        });
    });
});

// Creating a POST route that will INSERT a new User on the 'users' table from a MySQL database.
app.post('/newUser', function(req, res, next)
{
    // Creating our connection.
    db.getConnection(function(err, connection)
    {

        // Checking for errors.
        if(err) throw err;

        // Loggin our data just to see if it worked just fine.
        console.log("INSERT INTO users (name, email, password) values("+ req.body.name + ", "+ req.body.email + "," + req.body.password + ")");

        // Actually executing the query.
        connection.query("INSERT INTO users (name, email, password) values('"+ req.body.name + "', '"+ req.body.email + "','" + req.body.password + "')", function (error, results, fields)
        {
            // Checking for errors.
            if(error) throw error;

            // Sending our response code.
            res.send(JSON.stringify(results));
        });
    });
});

// Start our server.
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000!');
});