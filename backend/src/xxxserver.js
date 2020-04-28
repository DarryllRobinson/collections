//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const apiRouter = require('./api/api');

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
//app.use(morgan('combined'));

app.use('./api', apiRouter);

// start the server
app.listen(8081, () => {
  console.log('The server is listening on port 8081');
});

module.exports = app;