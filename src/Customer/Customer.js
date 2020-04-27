import React, {Component} from 'react';
import axios from 'axios';
import SubmitUpdate from './SubmitUpdate';
import auth0Client from '../Auth/Auth';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      customer: null
    };

    this.submitUpdate = this.submitUpdate.bind(this);
  }

  async componentDidMount() {
    await this.refreshCollection();
  }

  async refreshCollection() {
    //console.log('this.props: ', this.props);
    const { match: { params } } = this.props;
    //console.log(`http://localhost:8081/customers/${params.customerId}`);
    const customer = (await axios.get(`http://localhost:8081/customers/${params.customerId}`)).data;
    const account = (await axios.get(`http://localhost:8081/accounts/${params.customerId}`)).data;
    this.setState({
      account: account,
      customer: customer
    });
  }

  async submitUpdate(update){
    await axios.post(`http://localhost:8081/update/${this.state.customer.id}`, {
      update,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshCollection();
  }

  render() {
    const {customer} = this.state;
    const {account} = this.state;
    console.log('customer: ', customer);
    console.log('account: ', account);

    if (customer === null) return <p>Loading... </p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <p className="card-text">{customer[0].FirstName} {customer.Surname}</p>
            <p className="card-text">ID number: {customer[0].NationalIDNumber}</p>
            <p className="card-text">Contact number: {customer[0].ContactNumber}</p>
            <p className="card-text">Email: {customer[0].EmailAddress}</p>
            <hr className="my-4" />
            <SubmitUpdate accountId={customer.id} submitUpdate={this.submitUpdate} />
            <p>Notes</p>

          </div>
        </div>
      </div>
    );
  }
}

export default Customer;
