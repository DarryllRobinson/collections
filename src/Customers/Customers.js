import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: null,
      customers: null
    };
  }

  async componentDidMount() {
    const customers = (await axios.get('http://localhost:8081/customers/')).data;
    const accounts = (await axios.get('http://localhost:8081/accounts/')).data;
    this.setState({
      accounts,
      customers
    });
  }

  countAccounts(custid) {
    const accounts = this.state.accounts;
    let count = 0;
    accounts.forEach(function(element) {
      if (element.CustomerId === custid) {
        count = count + 1;
      }
    });
    return count;
  }

  countOverdueAccounts(custid) {
    const accounts = this.state.accounts;
    let count = 0;
    accounts.forEach(function(element) {
      if (element.CustomerId === custid && element.CurrentStatus !== "Active") {
        count = count + 1;
      }
    });
    return count;
  }

  listOfAccounts(custid) {
    const accounts = this.state.accounts;
    let arr = [];
    accounts.forEach(function(element) {
      if (element.CustomerId === custid) {
        arr.push(<p className="card-text" key={element.id}>{element.AccountNumber}</p>)
      }
    });
    return arr;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.customers === null && <p>Loading customer records...</p>}
          {
            this.state.customers && this.state.customers.map(customer => (
              <div key={customer.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/customer/${customer.id}`}>
                  <div className="card text-white bg-primary mb-3">
                    <div className="card-header">
                      <p>Accounts: {this.countAccounts(customer.id)}</p>
                      <p>Overdue accounts: {this.countOverdueAccounts(customer.id)}</p>
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">Current status: {customer.CurrentStatus}</h4>
                      <p className="card-text">{customer.FirstName} {customer.Surname}</p>
                      <p className="card-text">ID number: {customer.NationalIDNumber}</p>
                      <p className="card-text">Contact number: {customer.ContactNumber}</p>
                      <p className="card-text">Email: {customer.EmailAddress}</p>
                      <div className="lead">List of accounts{this.listOfAccounts(customer.id)}</div>
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

export default Customers;
