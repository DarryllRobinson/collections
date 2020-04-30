'use strict';

const Outcome = require('../models/outcomeModel.js');

exports.list_all_outcomes = function(req, res) {
  Outcome.getAllOutcome(function(err, outcome) {

    console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', outcome);
    res.send(outcome);
  });
};

exports.create_an_outcome = function(req, res) {
  const new_outcome = new Outcome(req.body);

  // handles null error
  if(!new_outcome.outcome || !new_outcome.status) {
    res.staus(400).send({
      error: true, message: 'Please provide outcome/status'
    })
  } else {
    Outcome.createOutcome(new_outcome, function(err, outcome) {
      if (err) res.send(err);
      res.json(outcome);
    });
  }
};

exports.read_an_outcome = function(req, res) {
  Outcome.getOutcomeById(req.params.outcomeId, function(err, outcome) {
    if (err)
      res.send(err);
    res.json(outcome);
  });
};

exports.update_an_outcome = function(req, res) {
  Outcome.updateOutcomeById(req.params.outcomeId, new Outcome(req.body), function(err, outcome) {
    if (err) res.send(err);
    res.json(outcome);
  })
}

exports.delete_an_outcome = function(req, res) {
  Outcome.removeOutcome(req.params.outcomeId, function(err, outcome) {
    if (err) res.send(err);
    res.json({ message: 'Outcome successfully deleted' });
  });
};
