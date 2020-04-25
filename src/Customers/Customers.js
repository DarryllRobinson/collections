import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: null,
    };
  }

  async componentDidMount() {
    const customers = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      customers,
    });
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
                    <div className="card-header">Number of cases: {customer.id}</div>
                    <div className="card-body">
                      <h4 className="card-title">{customer.Surname}</h4>
                      <p className="card-text">{customer.FirstName}</p>
                      <p className="card-text">ID number: {customer.NationalIDNumber}</p>
                      <p className="card-text">Contact number: {customer.ContactNumber}</p>
                      <p className="card-text">Email: {customer.EmailAddress}</p>
                      <p className="card-text">Current status: {customer.CurrentStatus}</p>
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
