'user strict';
const sql = require('./db.js');

const Outcome = function(outcome){
    this.outcome = outcome.outcome;
    this.status = outcome.status;
    this.created_at = new Date();
  };

Outcome.createOutcome = function(newOutcome, result) {
  sql.query("INSERT INTO outcomes set ?", newOutcome, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Outcome.getAllOutcome = function (result) {
  sql.query("Select * from outcomes", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('outcomes : ', res);
      result(null, res);
    }
  });
};

Outcome.getOutcomeById = function (outcomeId, result) {
  sql.query("Select * from outcomes where outcomeId = ?", outcomeId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('outcomes : ', res);
      result(null, res);
    }
  });
};


Outcome.updateOutcomeById = function(id, outcome, result){
  sql.query("UPDATE outcomes SET outcome = ? WHERE outcomeId = ?", [outcome.outcome, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Outcome.removeOutcome = function(id, result){
   sql.query("DELETE FROM outcomes WHERE outcomeId = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Outcome;
