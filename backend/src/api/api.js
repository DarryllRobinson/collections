const express = require('express');
const apiRouter = express.Router();
const accountsRouter = require('./accounts.js');
//const customerssRouter = require('./customers.js');

apiRouter.use('/accounts', accountsRouter);
//apiRouter.use('/customers', customerssRouter);

module.exports = apiRouter;
