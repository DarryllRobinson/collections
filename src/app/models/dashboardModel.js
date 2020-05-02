'user strict';
const sql = require('./db.js');

const Dashboard = function(dashboards){
    this.dashboards = dashboards.dashboards;
    this.status = dashboards.status;
    this.created_at = new Date();
  };

Dashboard.createDashboard = function(newDashboard, result) {
  sql.query("INSERT INTO dashboards set ?", newDashboard, function(err, res) {
    if(err) {
      console.log('err: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId)
    }
  });
};

Dashboard.getAllDashboard = function (result) {
  sql.query("Select outcomeId, operators.FirstName as opFirst, kams.FirstName as kamFirst, operators.OperatorShortCode, customers.CustomerShortCode, accounts.TotalBalance, accounts.Days30, accounts.Days60, accounts.Days90, accounts.Days120 from outcomes, cases, accounts, customers, operators, kams where f_caseId = caseId and f_accountId = accountId and f_customerId = customerId and f_operatorId = operatorId and f_kamId = kamId;", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('dashboards : ', res);
      result(null, res);
    }
  });
};

Dashboard.getDashboardById = function (dashboardId, result) {
  sql.query("Select * from dashboards where dashboardId = ?", dashboardId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('dashboards : ', res);
      result(null, res);
    }
  });
};


Dashboard.updateDashboardById = function(id, dashboards, result){
  sql.query("UPDATE dashboards SET dashboard = ? WHERE dashboardId = ?", [dashboards.dashboards, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
   } else{
     result(null, res);
    }
  });
};

Dashboard.removeDashboard = function(id, result){
   sql.query("DELETE FROM dashboards WHERE dashboardId = ?", [id], function (err, res) {
     if(err) {
       console.log("error: ", err);
       result(null, err);
     } else {
       result(null, res);
     }
   });
};

module.exports= Dashboard;
