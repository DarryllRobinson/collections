'use strict';

const Customer = require('../models/customerModel.js');

exports.list_all_customers = function(req, res) {
  Customer.getAllCustomer(function(err, customer) {

    if (err)
      res.send(err);
      //console.log('res', customer);
    res.send(customer);
  });
};

exports.create_a_customer = function(req, res) {
  const new_customer = new Customer(req.body);

  // handles null error
  if(!new_customer.customer || !new_customer.status) {
    res.staus(400).send({
      error: true, message: 'Please provide customer/status'
    })
  } else {
    Customer.createCustomer(new_customer, function(err, customer) {
      if (err) res.send(err);
      res.json(customer);
    });
  }
};

exports.read_a_customer = function(req, res) {
  Customer.getCustomerById(req.params.customerId, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};

exports.update_a_customer = function(req, res) {
  Customer.updateCustomerById(req.params.customerId, new Customer(req.body), function(err, customer) {
    if (err) res.send(err);
    res.json(customer);
  })
}

exports.delete_a_customer = function(req, res) {
  Customer.removeCustomer(req.params.customerId, function(err, customer) {
    if (err) res.send(err);
    res.json({ message: 'Customer successfully deleted' });
  });
};
