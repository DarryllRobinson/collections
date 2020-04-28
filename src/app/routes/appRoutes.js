'use strict';
module.exports = function(app) {
  const acc = require('../controllers/accountController');
  const cust = require('../controllers/customerController');
  //const upload = require('../controllers/uploadController');
  const home = require('../controllers/homeController');

  // acc Routes
  app.route('/accounts')
    .get(acc.list_all_accounts)
    .post(acc.create_an_account);

  app.route('/accounts/:accountId')
    .get(acc.read_an_account)
    .put(acc.update_an_account)
    .delete(acc.delete_an_account);

  // cust Routes
  app.route('/customers')
    .get(cust.list_all_customers)
    .post(cust.create_a_customer);

  app.route('/customers/:customerId')
    .get(cust.read_a_customer)
    .put(cust.update_a_customer)
    .delete(cust.delete_a_customer);

  // upload Routes
  /*app.route('/')
    .get(home.getHome);

  app.route('/file-upload')
    .post(upload.upload_a_file);*/

};
