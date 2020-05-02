import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      accounts: null,
      customers: null,
      dashs: null,
      kam: null
    };*/
    this.state = {
      dashboard: null
    }
  }

  async componentDidMount() {
    /*const customers = (await axios.get('http://localhost:8081/customers/')).data;
    const accounts = (await axios.get('http://localhost:8081/accounts/')).data;
    const dashs = (await axios.get('http://localhost:8081/dashs/')).data;
    const kam = (await axios.get('http://localhost:8081/kams/')).data;
    this.setState({
      accounts,
      customers,
      dashs,
      kam
    });*/
    const dashboard = (await axios.get('http://localhost:8081/dashboard/')).data;
    this.setState({
      dashboard
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.dashboard === null && <p>Loading Dashboard...</p>}
          {
            this.state.dashboard && this.state.dashboard.map(dash => (
              <div key={dash.outcomeId} className="col-sm-12 col-md-4 col-lg-3">
                <table>
                  <thead>
                    <tr>
                      <th>DC Name</th>
                      <th>KAM</th>
                      <th>DC</th>
                      <th>Client Key</th>
                      <th>Balance</th>
                      <th>Current</th>
                      <th>30 Days</th>
                      <th>60 Days</th>
                      <th>90 Days</th>
                      <th>120 Days</th>
                      <th>Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dash.opFirst}</td>
                      <td>{dash.kamFirst}</td>
                      <td>{dash.OperatorShortCode}</td>
                      <td>{dash.CustomerShortCode}</td>
                      <td>{dash.TotalBalance}</td>
                      <td>{dash.Current}</td>
                      <td>{dash.Days30}</td>
                      <td>{dash.Days60}</td>
                      <td>{dash.Days90}</td>
                      <td>{dash.Days120}</td>
                      <td>Open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Dashboard;