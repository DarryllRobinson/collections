'use strict';

const Customer = require('../models/customerModel.js');

exports.list_all_customers = function(req, res) {
  Customer.getAllCustomers(function(err, customer) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', customer);
    res.send(customer);
  });
};

exports.read_a_customer = function(req, res) {
  Customer.getCustomerById(req.params.customerId, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};
