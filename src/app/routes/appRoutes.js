'use strict';
module.exports = function(app) {
  const acc = require('../controllers/accountController');
  const cust = require('../controllers/customerController');
  const out = require('../controllers/outcomeController');
  const cases = require('../controllers/caseController');
  const contact = require('../controllers/contactController');
  //const upload = require('../controllers/uploadController');
  //const home = require('../controllers/homeController');

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

  // out Routes
  app.route('/outcomes')
    .get(out.list_all_outcomes)
    .post(out.create_an_outcome);

  app.route('/outcomes/:outcomeId')
    .get(out.read_an_outcome)
    .put(out.update_an_outcome)
    .delete(out.delete_an_outcome);

  // cases Routes
  app.route('/cases')
  .get(cases.list_all_cases)
  .post(cases.create_a_case);

  app.route('/cases/:caseId')
    .get(cases.read_a_case)
    .put(cases.update_a_case)
    .delete(cases.delete_a_case);

  // contact Routes
  app.route('/contacts')
    .get(contact.list_all_contacts)
    .post(contact.create_a_contact);

  app.route('/contacts/:contactId')
    .get(contact.read_a_contact)
    .put(contact.update_a_contact)
    .delete(contact.delete_a_contact);
};
