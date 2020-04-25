import React, {Component} from 'react';
import axios from 'axios';
import SubmitUpdate from './SubmitUpdate';
import auth0Client from '../Auth/Auth';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const customer = (await axios.get(`http://localhost:8081/${params.customerId}`)).data;
    this.setState({
      customer,
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
    console.log('customer: ', customer);

    if (customer === null) return <p>Loading... </p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{customer.FirstName}</h1>
            <p className="lead">{customer.Surname}</p>
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
