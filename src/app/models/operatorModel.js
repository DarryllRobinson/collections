'user strict';
const sql = require('./db.js');

const Operator = function(operator){
    this.operator = operator.operator;
    this.status = operator.status;
    this.created_at = new Date();
  };

Operator.createOperator = function(newOperator, result) {
  sql.query("INSERT INTO operators set ?", newOperator, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Operator.getAllOperator = function (result) {
  sql.query("Select * from operators", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('operators : ', res);
      result(null, res);
    }
  });
};

Operator.getOperatorById = function (operatorId, result) {
  sql.query("Select * from operators where operatorId = ?", operatorId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('operators : ', res);
      result(null, res);
    }
  });
};


Operator.updateOperatorById = function(id, operator, result){
  sql.query("UPDATE operators SET operator = ? WHERE operatorId = ?", [operator.operator, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Operator.removeOperator = function(id, result){
   sql.query("DELETE FROM operators WHERE operatorId = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Operator;
