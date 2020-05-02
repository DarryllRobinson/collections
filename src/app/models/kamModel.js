'user strict';
const sql = require('./db.js');

const Kam = function(kams){
    this.kams = kams.kams;
    this.status = kams.status;
    this.created_at = new Date();
  };

Kam.createKam = function(newKam, result) {
  sql.query("INSERT INTO kams set ?", newKam, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Kam.getAllKam = function (result) {
  sql.query("Select * from kams", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('kams : ', res);
      result(null, res);
    }
  });
};

Kam.getKamById = function (kamId, result) {
  sql.query("Select * from kams where kamId = ?", kamId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('kams : ', res);
      result(null, res);
    }
  });
};


Kam.updateKamById = function(id, kams, result){
  sql.query("UPDATE kams SET kam = ? WHERE kamId = ?", [kams.kams, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Kam.removeKam = function(id, result){
   sql.query("DELETE FROM kams WHERE kamId = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Kam;
