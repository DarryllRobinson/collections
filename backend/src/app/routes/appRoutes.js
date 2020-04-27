'use strict';
module.exports = function(app) {
  const acc = require('../controllers/appController');

  // acc Routes
  app.route('/accounts')
    .get(acc.list_all_accounts);

  app.route('/accounts/:accountId')
    .get(acc.read_an_account);
    };
