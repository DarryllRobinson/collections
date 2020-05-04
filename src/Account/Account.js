import React, {Component} from 'react';
import axios from 'axios';
import SubmitUpdate from './SubmitUpdate';
import auth0Client from '../Auth/Auth';

class Account extends Component {
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
    const account = (await axios.get(`http://localhost:8081/accounts/${params.accountId}`)).data;
    const customer = (await axios.get(`http://localhost:8081/customers/${account[0].f_customerId}`)).data;
    this.setState({
      account,
      customer
    });
  }

  async submitUpdate(update){
    console.log(`http://localhost:8081/accounts/${this.state.account[0].accountId}`);
    await axios.post(`http://localhost:8081/accounts/${this.state.account[0].accountId}`, {
      update,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshCollection();
  }

  render() {
    const {account} = this.state;
    const {customer} = this.state;

    if (account === null) return <p>Loading... </p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <p className="lead">{console.log(account[0])}
              Customer name: {customer[0].FirstName} {customer[0].Surname}</p>
            <p>Current Balance {account[0].CurrentBalance}</p>
            <p>30 Days {account[0].Days30}</p>
            <p>60 Days {account[0].Days60}</p>
            <p>90 Days {account[0].Days90}</p>
            <p>120 Days {account[0].Days120}</p>
            <p>Notes: {account[0].AccountNotes}</p>
            <hr className="my-4" />
            <SubmitUpdate accountId={account[0].accountId} submitUpdate={this.submitUpdate} />
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
