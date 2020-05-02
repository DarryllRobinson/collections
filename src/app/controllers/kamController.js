'use strict';

const Kam = require('../models/kamModel.js');

exports.list_all_kams = function(req, res) {
  Kam.getAllKam(function(err, kams) {

    if (err)
      res.send(err);
      //console.log('res', kam);
    res.send(kams);
  });
};

exports.create_a_kam = function(req, res) {
  const new_kam = new Kam(req.body);

  // handles null error
  if(!new_kam.kam || !new_kam.status) {
    res.staus(400).send({
      error: true, message: 'Please provide kam/status'
    })
  } else {
    Kam.createKam(new_kam, function(err, kams) {
      if (err) res.send(err);
      res.json(kams);
    });
  }
};

exports.read_a_kam = function(req, res) {
  Kam.getKamById(req.params.kamId, function(err, kams) {
    if (err)
      res.send(err);
    res.json(kams);
  });
};

exports.update_a_kam = function(req, res) {
  Kam.updateKamById(req.params.kamId, new Kam(req.body), function(err, kams) {
    if (err) res.send(err);
    res.json(kams);
  })
}

exports.delete_a_kam = function(req, res) {
  Kam.removeKam(req.params.kamId, function(err, kams) {
    if (err) res.send(err);
    res.json({ message: 'Kam successfully deleted' });
  });
};
