'user strict';
const sql = require('./db.js');

const Contact = function(contact){
    this.contact = contact.contact;
    this.status = contact.status;
    this.created_at = new Date();
  };

Contact.createContact = function(newContact, result) {
  sql.query("INSERT INTO contacts set ?", newContact, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Contact.getAllContact = function (result) {
  sql.query("Select * from contacts", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('contacts : ', res);
      result(null, res);
    }
  });
};

Contact.getContactById = function (contactId, result) {
  sql.query("Select * from contacts where id = ?", contactId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('contacts : ', res);
      result(null, res);
    }
  });
};


Contact.updateContactById = function(id, contact, result){
  sql.query("UPDATE contacts SET contact = ? WHERE id = ?", [contact.contact, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Contact.removeContact = function(id, result){
   sql.query("DELETE FROM contacts WHERE id = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Contact;
