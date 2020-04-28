const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8081;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const formidable = require('formidable');
const mv = require('mv');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'fonebook'
});

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(__dirname + '/public'));

// enable all CORS requests
app.use(cors());

// log HTTP requests
//app.use(morgan('combined'));

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

const routes = require('./app/routes/appRoutes'); //importing Routes
routes(app); //register the route
