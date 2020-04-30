'user strict';
const sql = require('./db.js');

const Case = function(cases){
    this.cases = cases.cases;
    this.status = cases.status;
    this.created_at = new Date();
  };

Case.createCase = function(newCase, result) {
  sql.query("INSERT INTO cases set ?", newCase, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Case.getAllCase = function (result) {
  sql.query("Select * from cases", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('cases : ', res);
      result(null, res);
    }
  });
};

Case.getCaseById = function (caseId, result) {
  sql.query("Select * from cases where id = ?", caseId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('cases : ', res);
      result(null, res);
    }
  });
};


Case.updateCaseById = function(id, cases, result){
  sql.query("UPDATE cases SET case = ? WHERE id = ?", [cases.cases, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Case.removeCase = function(id, result){
   sql.query("DELETE FROM cases WHERE id = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Case;
