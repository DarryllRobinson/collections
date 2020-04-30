'use strict';

const Case = require('../models/caseModel.js');

exports.list_all_cases = function(req, res) {
  Case.getAllCase(function(err, cases) {

    console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', case);
    res.send(cases);
  });
};

exports.create_a_case = function(req, res) {
  const new_case = new Case(req.body);

  // handles null error
  if(!new_case.case || !new_case.status) {
    res.staus(400).send({
      error: true, message: 'Please provide case/status'
    })
  } else {
    Case.createCase(new_case, function(err, cases) {
      if (err) res.send(err);
      res.json(cases);
    });
  }
};

exports.read_a_case = function(req, res) {
  Case.getCaseById(req.params.caseId, function(err, cases) {
    if (err)
      res.send(err);
    res.json(cases);
  });
};

exports.update_a_case = function(req, res) {
  Case.updateCaseById(req.params.caseId, new Case(req.body), function(err, cases) {
    if (err) res.send(err);
    res.json(cases);
  })
}

exports.delete_a_case = function(req, res) {
  Case.removeCase(req.params.caseId, function(err, cases) {
    if (err) res.send(err);
    res.json({ message: 'Case successfully deleted' });
  });
};
