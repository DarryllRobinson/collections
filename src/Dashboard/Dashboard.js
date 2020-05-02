import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: null,
      customers: null,
      operators: null,
      kam: null
    };
  }

  async componentDidMount() {
    const customers = (await axios.get('http://localhost:8081/customers/')).data;
    const accounts = (await axios.get('http://localhost:8081/accounts/')).data;
    const operators = (await axios.get('http://localhost:8081/operators/')).data;
    const kam = (await axios.get('http://localhost:8081/kams/')).data;
    this.setState({
      accounts,
      customers,
      operators,
      kam
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.operators === null && <p>Loading Dashboard...</p>}
          {
            this.state.operators && this.state.operators.map(operator => (
              <div key={operator.operatorId} className="col-sm-12 col-md-4 col-lg-3">
                <p>{operator.FirstName}</p>
                <p>{kam.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>{operator.FirstName}</p>
                <p>Open?</p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Dashboard;
