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
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">DC Name</th>
                      <th scope="col">KAM</th>
                      <th scope="col">DC</th>
                      <th scope="col">Client Key</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Current</th>
                      <th scope="col">30 Days</th>
                      <th scope="col">60 Days</th>
                      <th scope="col">90 Days</th>
                      <th scope="col">120 Days</th>
                      <th scope="col">Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-primary">
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
                      <td><Link to={`/accounts/${dash.accountId}`}>Open</Link></td>
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
