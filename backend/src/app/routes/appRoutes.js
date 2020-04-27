'use strict';
module.exports = function(app) {
  const acc = require('../controllers/accountController');
  const cust = require('../controllers/customerController');

  // acc Routes
  app.route('/accounts')
    .get(acc.list_all_accounts);

  app.route('/accounts/:accountId')
    .get(acc.read_an_account);

  // cust Routes
  app.route('/customers')
    .get(cust.list_all_customers);

  app.route('/customers/:customerId')
    .get(cust.read_a_customer);

};
