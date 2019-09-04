require('dotenv').config(); //instatiate environment variables

let CONFIG = {}; //Make this global to use all over the application

CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_host      = process.env.DB_HOST       || '127.0.0.1';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
CONFIG.db_name      = process.env.DB_NAME       || 'lwpcms';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'secret';
CONFIG.db_connectionlimit  = process.env.DB_CL   || '10';

CONFIG.secret_key  = process.env.SECRET_KEY   || 'secret';

module.exports = CONFIG;
