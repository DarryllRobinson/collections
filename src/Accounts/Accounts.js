import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: null,
    };
  }

  async componentDidMount() {
    const accounts = (await axios.get('http://localhost:8081/accounts/')).data;
    this.setState({
      accounts,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.accounts === null && <p>Loading account records...</p>}
          {
            this.state.accounts && this.state.accounts.map(account => (
              <div key={account.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/account/${account.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Notes: {account.AccountNotes}</div>
                    <div className="card-body">
                      <h4 className="card-title">{account.CustomerShortCode}</h4>
                      <p className="card-text">{account.PaymentMethod}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Accounts;
