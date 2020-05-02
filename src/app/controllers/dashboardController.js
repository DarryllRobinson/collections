'use strict';

const Dashboard = require('../models/dashboardModel.js');

exports.list_all_dashboards = function(req, res) {
  Dashboard.getAllDashboard(function(err, dashboards) {

    if (err)
      res.send(err);
      //console.log('res', dashboard);
    res.send(dashboards);
  });
};

exports.create_a_dashboard = function(req, res) {
  const new_dashboard = new Dashboard(req.body);

  // handles null error
  if(!new_dashboard.dashboard || !new_dashboard.status) {
    res.staus(400).send({
      error: true, message: 'Please provide dashboard/status'
    })
  } else {
    Dashboard.createDashboard(new_dashboard, function(err, dashboards) {
      if (err) res.send(err);
      res.json(dashboards);
    });
  }
};

exports.read_a_dashboard = function(req, res) {
  Dashboard.getDashboardById(req.params.dashboardId, function(err, dashboards) {
    if (err)
      res.send(err);
    res.json(dashboards);
  });
};

exports.update_a_dashboard = function(req, res) {
  Dashboard.updateDashboardById(req.params.dashboardId, new Dashboard(req.body), function(err, dashboards) {
    if (err) res.send(err);
    res.json(dashboards);
  })
}

exports.delete_a_dashboard = function(req, res) {
  Dashboard.removeDashboard(req.params.dashboardId, function(err, dashboards) {
    if (err) res.send(err);
    res.json({ message: 'Dashboard successfully deleted' });
  });
};
