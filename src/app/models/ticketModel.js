'user strict';
const sql = require('./db.js');

const Ticket = function(tickets){
    this.tickets = tickets.tickets;
    this.status = tickets.status;
    this.created_at = new Date();
  };

Ticket.createTicket = function(newTicket, result) {
  sql.query("INSERT INTO tickets set ?", newTicket, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Ticket.getAllOpenTicket = function (result) {
  sql.query("Select * from tickets where Closed = null", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('tickets : ', res);
      result(null, res);
    }
  });
};

Ticket.getAllClosedTicket = function (result) {
  sql.query("Select * from tickets where Closed <> null", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('tickets : ', res);
      result(null, res);
    }
  });
};

Ticket.getTicketById = function (ticketId, result) {
  sql.query("Select * from tickets where ticketId = ?", ticketId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('tickets : ', res);
      result(null, res);
    }
  });
};


Ticket.updateTicketById = function(id, tickets, result){
  sql.query("UPDATE tickets SET ticket = ? WHERE ticketId = ?", [tickets.tickets, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Ticket.removeTicket = function(id, result){
   sql.query("DELETE FROM tickets WHERE ticketId = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Ticket;
