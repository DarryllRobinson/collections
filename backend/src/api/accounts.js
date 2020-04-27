'user strict';
const sql = require('./db.js');

const Account = function(account){
    this.account = account.account;
    this.status = account.status;
    this.created_at = new Date();

Account.getAllAccount = function (result) {
        sql.query("Select * from accounts", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('accounts : ', res);

                 result(null, res);
                }
            });
};

module.exports= Account;
