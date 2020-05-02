'use strict';

const Operator = require('../models/operatorModel.js');

exports.list_all_operators = function(req, res) {
  Operator.getAllOperator(function(err, operator) {

    if (err)
      res.send(err);
      //console.log('res', operator);
    res.send(operator);
  });
};

exports.create_an_operator = function(req, res) {
  const new_operator = new Operator(req.body);

  // handles null error
  if(!new_operator.operator || !new_operator.status) {
    res.staus(400).send({
      error: true, message: 'Please provide operator/status'
    })
  } else {
    Operator.createOperator(new_operator, function(err, operator) {
      if (err) res.send(err);
      res.json(operator);
    });
  }
};

exports.read_an_operator = function(req, res) {
  Operator.getOperatorById(req.params.operatorId, function(err, operator) {
    if (err)
      res.send(err);
    res.json(operator);
  });
};

exports.update_an_operator = function(req, res) {
  Operator.updateOperatorById(req.params.operatorId, new Operator(req.body), function(err, operator) {
    if (err) res.send(err);
    res.json(operator);
  })
}

exports.delete_an_operator = function(req, res) {
  Operator.removeOperator(req.params.operatorId, function(err, operator) {
    if (err) res.send(err);
    res.json({ message: 'Operator successfully deleted' });
  });
};
