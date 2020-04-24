//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// define the Express app
const app = express();

// the database
const collections = [
  {
    "id": 1,
    "idnumber": "7711225111083",
    "reference": "99",
    "opendate": "24/04/2020",
    "firstname": "Joe",
    "surname": "Bloggs",
    "cellnumber": "084 111 1234",
    "amount": 1000,
    "notes": ["notes","even more notes"],
    "author": ""
  },
  {
    "id": 2,
    "idnumber": "8804112111083",
    "reference": "99",
    "opendate": "12/07/2019",
    "firstname": "Susan",
    "surname": "Storm",
    "cellnumber": "084 222 1234",
    "amount": 1456,
    "notes": ["notes"],
    "author": ""
  }
];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all questions
app.get('/', (req, res) => {
  const cs = collections.map(c => ({
    id: c.id,
    idnumber: c.idnumber,
    reference: c.reference,
    opendate: c.opendate,
    firstname: c.firstname,
    surname: c.surname,
    cellnumber: c.cellnumber,
    amount: c.amount,
    notes: c.notes.length,
    author: c.author
  }));
  res.send(cs);
});

// get a specific collection record
app.get('/:id', (req, res) => {
  const collection = collections.filter(c => (c.id === parseInt(req.params.id)));
  if (collection.length > 1) return res.status(500).send();
  if (collection.length === 0) return res.status(404).send();
  res.send(collection[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://fcmcms.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'fkwBprhTiDiiWaXb37yAFn14DU5ct1zy',
  issuer: `https://fcmcms.eu.auth0.com/`,
  algorithms: ['RS256']
});

// insert a new collection record ******* TO COME
/*app.post('/', checkJwt, (req, res) => {
  const {title, description} = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
});*/

// insert a new note to a record
app.post('/update/:id', checkJwt, (req, res) => {
  const {update} = req.body;

  const collection = collections.filter(c => (c.id === parseInt(req.params.id)));
  if (collection.length > 1) return res.status(500).send();
  if (collection.length === 0) return res.status(404).send();

  console.log('update: ', update);

  collection[0].notes.push({
    update,
    author: req.user.name,
  });

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
