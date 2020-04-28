'user strict';
const sql = require('./db.js');

const Account = function(account){
    this.account = account.account;
    this.status = account.status;
    this.created_at = new Date();
  };

Account.createAccount = function(newAccount, result) {
  sql.query("INSERT INTO accounts set ?", newAccount, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Account.getAllAccount = function (result) {
  sql.query("Select * from accounts", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('accounts : ', res);
      result(null, res);
    }
  });
};

Account.getAccountById = function (accountId, result) {
  sql.query("Select * from accounts where id = ?", accountId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('accounts : ', res);
      result(null, res);
    }
  });
};


Account.updateById = function(id, account, result){
  sql.query("UPDATE accounts SET task = ? WHERE id = ?", [account.account, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Account.remove = function(id, result){
   sql.query("DELETE FROM accounts WHERE id = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Account;
