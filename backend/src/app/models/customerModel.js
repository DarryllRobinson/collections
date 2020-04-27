'user strict';
const sql = require('./db.js');

const Customer = function(customer){
    this.customer = customer.customer;
    this.status = customer.status;
    this.created_at = new Date();
  };

Customer.getAllCustomers = function (result) {
  sql.query("Select * from customers", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('customers : ', res);
      result(null, res);
    }
  });
};

Customer.getCustomerById = function (customerId, result) {
  sql.query("Select * from customers where id = ?", customerId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('customers : ', res);
      result(null, res);
    }
  });
};

module.exports= Customer;
