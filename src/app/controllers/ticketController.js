'use strict';

const Ticket = require('../models/ticketModel.js');

exports.list_all_open_tickets = function(req, res) {
  Ticket.getAllOpenTicket(function(err, tickets) {

    if (err)
      res.send(err);
      //console.log('res', ticket);
    res.send(tickets);
  });
};

exports.list_all_closed_tickets = function(req, res) {
  Ticket.getAllClosedTicket(function(err, tickets) {

    if (err)
      res.send(err);
      //console.log('res', ticket);
    res.send(tickets);
  });
};

exports.create_a_ticket = function(req, res) {
  const new_ticket = new Ticket(req.body);

  // handles null error
  if(!new_ticket.ticket || !new_ticket.status) {
    res.staus(400).send({
      error: true, message: 'Please provide ticket/status'
    })
  } else {
    Ticket.createTicket(new_ticket, function(err, tickets) {
      if (err) res.send(err);
      res.json(tickets);
    });
  }
};

exports.read_a_ticket = function(req, res) {
  Ticket.getTicketById(req.params.ticketId, function(err, tickets) {
    if (err)
      res.send(err);
    res.json(tickets);
  });
};

exports.update_a_ticket = function(req, res) {
  Ticket.updateTicketById(req.params.ticketId, new Ticket(req.body), function(err, tickets) {
    if (err) res.send(err);
    res.json(tickets);
  })
}

exports.delete_a_ticket = function(req, res) {
  Ticket.removeTicket(req.params.ticketId, function(err, tickets) {
    if (err) res.send(err);
    res.json({ message: 'Ticket successfully deleted' });
  });
};
