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
// Accounts
const accounts = [
  {
    "id": 1,
    "CustomerShortCode": "custshortcode",
    "AccountNumber": "acc1",
    "DebtorAge": 10,
    "PaymentTermDays": 30,
    "CreditLimit": 3000,
    "TotalBalance": 2500,
    "AmountDue": 1350,
    "CurrentBalance": 1700,
    "Days30": 400,
    "Days60": 500,
    "Days90": 600,
    "Days120": 300,
    "Days150": 0,
    "Days180": 0,
    "PaymentMethod": "EFT",
    "PaymentDueDate": 2,
    "DebitOrderDate": 2,
    "LastPaymentDate": "02/03/2020",
    "LastPTPDate": "",
    "LastPTPAmount": 0,
    "AccountNotes": "",
    "NextVisitDate": "",
    "CurrentStatus": "Soft Locked",
    "DateCreated": "03/01/2020",
    "CreatedBy": "Adrian",
    "DateLastUpdated": "25/04/2020",
    "LastUpdatedBy": "Darryll",
    "CustomerId": 1
  },
  {
    "id": 2,
    "CustomerShortCode": "custshortcode",
    "AccountNumber": "acc2",
    "DebtorAge": 10,
    "PaymentTermDays": 30,
    "CreditLimit": 3000,
    "TotalBalance": 2500,
    "AmountDue": 1350,
    "CurrentBalance": 1700,
    "Days30": 400,
    "Days60": 500,
    "Days90": 600,
    "Days120": 300,
    "Days150": 0,
    "Days180": 0,
    "PaymentMethod": "EFT",
    "PaymentDueDate": 2,
    "DebitOrderDate": 2,
    "LastPaymentDate": "02/03/2020",
    "LastPTPDate": "",
    "LastPTPAmount": 0,
    "AccountNotes": "",
    "NextVisitDate": "",
    "CurrentStatus": "Active",
    "DateCreated": "03/01/2020",
    "CreatedBy": "Adrian",
    "DateLastUpdated": "25/04/2020",
    "LastUpdatedBy": "Darryll",
    "CustomerId": 1
  },
  {
    "id": 3,
    "CustomerShortCode": "custshortcode",
    "AccountNumber": "acc1",
    "DebtorAge": 10,
    "PaymentTermDays": 30,
    "CreditLimit": 3000,
    "TotalBalance": 2500,
    "AmountDue": 1350,
    "CurrentBalance": 1700,
    "Days30": 400,
    "Days60": 500,
    "Days90": 600,
    "Days120": 300,
    "Days150": 0,
    "Days180": 0,
    "PaymentMethod": "EFT",
    "PaymentDueDate": 2,
    "DebitOrderDate": 2,
    "LastPaymentDate": "02/03/2020",
    "LastPTPDate": "",
    "LastPTPAmount": 0,
    "AccountNotes": "",
    "NextVisitDate": "",
    "CurrentStatus": "Active",
    "DateCreated": "03/01/2020",
    "CreatedBy": "Adrian",
    "DateLastUpdated": "25/04/2020",
    "LastUpdatedBy": "Darryll",
    "CustomerId": 2
  }
]

const customers = [
  {
    "id": 1,
    "OperatorShortCode": "opshortcode",
    "CustomerShortCode": "custshortcode",
    "CustomerEntity": "Consumer",
    "CustomerName": "custname",
    "FirstName": "Stephen",
    "Surname": "Strange",
    "NationalIDNumber": "123456789012345",
    "CompanyRegNumber": "",
    "ContactNumber": "0123",
    "EmailAddress": "email@email.com",
    "Classification": "classification",
    "Category": "category",
    "Region": "region",
    "Sector": "sector",
    "CurrentStatus": "Active",
    "DateCreated": "03/01/2020",
    "CreatedBy": "Adrian",
    "DateLastUpdated": "25/04/2020",
    "LastUpdatedBy": "Darryll"
  },
  {
    "id": 2,
    "OperatorShortCode": "opshortcode",
    "CustomerShortCode": "custshortcode",
    "CustomerEntity": "Consumer",
    "CustomerName": "custname",
    "FirstName": "Thor",
    "Surname": "Odinson",
    "NationalIDNumber": "234567890123456",
    "CompanyRegNumber": "",
    "ContactNumber": "1234",
    "EmailAddress": "thor@email.com",
    "Classification": "classification",
    "Category": "category",
    "Region": "Asgard",
    "Sector": "sector",
    "CurrentStatus": "Active",
    "DateCreated": "03/01/2020",
    "CreatedBy": "Adrian",
    "DateLastUpdated": "25/04/2020",
    "LastUpdatedBy": "Darryll"
  }
]

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
    "notes": [],
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
    "notes": [],
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
//app.use(morgan('combined'));

// CUSTOMERS ***************************************************************
// retrieve all customers
app.get('/customers/', (req, res) => {
  const ccs = customers.map(cc => ({
    id: cc.id,
    OperatorShortCode: cc.OperatorShortCode,
    CustomerShortCode: cc.CustomerShortCode,
    CustomerEntity: cc.CustomerEntity,
    CustomerName: cc.CustomerName,
    FirstName: cc.FirstName,
    Surname: cc.Surname,
    NationalIDNumber: cc.NationalIDNumber,
    CompanyRegNumber: cc.CompanyRegNumber,
    ContactNumber: cc.ContactNumber,
    EmailAddress: cc.EmailAddress,
    Classification: cc.Classification,
    Category: cc.Category,
    Region: cc.Region,
    Sector: cc.Sector,
    CurrentStatus: cc.CurrentStatus,
    DateCreated: cc.DateCreated,
    CreatedBy: cc.CreatedBy,
    DateLastUpdated: cc.DateLastUpdated,
    LastUpdatedBy: cc.LastUpdatedBy
  }));
  res.send(ccs);
});

// get a specific customer record
app.get('/customer/:id', (req, res) => {
  const customer = customers.filter(c => (c.id === parseInt(req.params.id)));
  console.log(req.params);
  if (customer.length > 1) return res.status(500).send();
  if (customer.length === 0) return res.status(404).send();
  res.send(customer[0]);
});

// ACCOUNTS ***************************************************************
// retrieve all accounts
app.get('/accounts/', (req, res) => {
  const accs = accounts.map(acc => ({
    id: acc.id,
    CustomerShortCode: acc.CustomerShortCode,
    AccountNumber: acc.AccountNumber,
    DebtorAge: acc.DebtorAge,
    PaymentTermDays: acc.PaymentTermDays,
    CreditLimit: acc.CreditLimit,
    TotalBalance: acc.TotalBalance,
    AmountDue: acc.AmountDue,
    CurrentBalance: acc.CurrentBalance,
    Days30: acc.Days30,
    Days60: acc.Days60,
    Days90: acc.Days90,
    Days120: acc.Days120,
    Days150: acc.Days150,
    Days180: acc.Days180,
    PaymentMethod: acc.PaymentMethod,
    PaymentDueDate: acc.PaymentDueDate,
    DebitOrderDate: acc.DebitOrderDate,
    LastPaymentDate: acc.LastPaymentDate,
    LastPTPDate: acc.LastPTPDate,
    LastPTPAmount: acc.LastPTPAmount,
    AccountNotes: acc.AccountNotes,
    NextVisitDate: acc.NextVisitDate,
    CurrentStatus: acc.CurrentStatus,
    DateCreated: acc.DateCreated,
    CreatedBy: acc.CreatedBy,
    DateLastUpdated: acc.DateLastUpdated,
    LastUpdatedBy: acc.LastUpdatedBy,
    CustomerId: acc.CustomerId
  }));
  res.send(accs);
});

// get a specific account
app.get('/account/:id', (req, res) => {
  const account = accounts.filter(c => (c.id === parseInt(req.params.id)));
  if (account.length > 1) return res.status(500).send();
  if (account.length === 0) return res.status(404).send();
  res.send(account[0]);
});

// COLLECTIONS ***************************************************************
// get a specific collection record
/*app.get('/collection/:id', (req, res) => {
  const collection = collections.filter(c => (c.id === parseInt(req.params.id)));
  if (collection.length > 1) return res.status(500).send();
  if (collection.length === 0) return res.status(404).send();
  res.send(collection[0]);
});

// insert a new collection record ******* TO COME
app.post('/', checkJwt, (req, res) => {
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
});

// insert a new note to a record
app.post('/update/:id', checkJwt, (req, res) => {
  const {update} = req.body;

  const collection = collections.filter(c => (c.id === parseInt(req.params.id)));
  if (collection.length > 1) return res.status(500).send();
  if (collection.length === 0) return res.status(404).send();

  console.log('update: ', update);
  console.log('req.user.name: ', req.user.name);

  collection[0].notes.push({
    update
  });

  res.status(200).send();
});*/

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

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
