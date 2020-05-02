'use strict';

const Contact = require('../models/contactModel.js');

exports.list_all_contacts = function(req, res) {
  Contact.getAllContact(function(err, contact) {

    if (err)
      res.send(err);
      //console.log('res', contact);
    res.send(contact);
  });
};

exports.create_a_contact = function(req, res) {
  const new_contact = new Contact(req.body);

  // handles null error
  if(!new_contact.contact || !new_contact.status) {
    res.staus(400).send({
      error: true, message: 'Please provide contact/status'
    })
  } else {
    Contact.createContact(new_contact, function(err, contact) {
      if (err) res.send(err);
      res.json(contact);
    });
  }
};

exports.read_a_contact = function(req, res) {
  Contact.getContactById(req.params.contactId, function(err, contact) {
    if (err)
      res.send(err);
    res.json(contact);
  });
};

exports.update_a_contact = function(req, res) {
  Contact.updateContactById(req.params.contactId, new Contact(req.body), function(err, contact) {
    if (err) res.send(err);
    res.json(contact);
  })
}

exports.delete_a_contact = function(req, res) {
  Contact.removeContact(req.params.contactId, function(err, contact) {
    if (err) res.send(err);
    res.json({ message: 'Contact successfully deleted' });
  });
};
