'use strict';

const Account = require('../models/accountModel.js');

exports.list_all_accounts = function(req, res) {
  Account.getAllAccount(function(err, account) {

    if (err)
      res.send(err);
      //console.log('res', account);
    res.send(account);
  });
};

exports.create_an_account = function(req, res) {
  const new_account = new Account(req.body);

  // handles null error
  if(!new_account.account || !new_account.status) {
    res.staus(400).send({
      error: true, message: 'Please provide account/status'
    })
  } else {
    Account.createAccount(new_account, function(err, account) {
      if (err) res.send(err);
      res.json(account);
    });
  }
};

exports.read_an_account = function(req, res) {
  Account.getAccountById(req.params.accountId, function(err, account) {
    if (err)
      res.send(err);
    res.json(account);
  });
};

exports.update_an_account = function(req, res) {
  console.log('req.body: ', req.body);
  let arr = [];
  arr.push(req.body);
  console.log('arr: ', arr);
  Account.updateAccountById(req.params.accountId, arr, function(err, account) {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    }
    res.json(account);
  })
}

exports.delete_an_account = function(req, res) {
  Account.removeAccount(req.params.accountId, function(err, account) {
    if (err) res.send(err);
    res.json({ message: 'Account successfully deleted' });
  });
};
