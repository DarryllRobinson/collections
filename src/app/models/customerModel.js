'user strict';
const sql = require('./db.js');

const Customer = function(customer){
    this.customer = customer.customer;
    this.status = customer.status;
    this.created_at = new Date();
  };

Customer.createCustomer = function(newCustomer, result) {
  sql.query("INSERT INTO customers set ?", newCustomer, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Customer.getAllCustomer = function (result) {
  sql.query("Select * from customers", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('customers : ', res);
      result(null, res);
    }
  });
};

Customer.getCustomerById = function (customerId, result) {
  sql.query("Select * from customers where customerId = ?", customerId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('customers : ', res);
      result(null, res);
    }
  });
};


Customer.updateCustomerById = function(id, customer, result){
  sql.query("UPDATE customers SET customer = ? WHERE customerId = ?", [customer.customer, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Customer.removeCustomer = function(id, result){
   sql.query("DELETE FROM customers WHERE customerId = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Customer;
