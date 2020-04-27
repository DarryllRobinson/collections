'use strict';

const Account = require('../models/accountModel.js');

exports.list_all_accounts = function(req, res) {
  Account.getAllAccount(function(err, account) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', account);
    res.send(account);
  });
};

exports.read_an_account = function(req, res) {
  Account.getAccountById(req.params.accountId, function(err, account) {
    if (err)
      res.send(err);
    res.json(account);
  });
};
