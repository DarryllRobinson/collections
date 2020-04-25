import React, {Component} from 'react';
import axios from 'axios';
import SubmitUpdate from './SubmitUpdate';
import auth0Client from '../Auth/Auth';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };

    this.submitUpdate = this.submitUpdate.bind(this);
  }

  async componentDidMount() {
    await this.refreshCollection();
  }

  async refreshCollection() {
    //console.log('this.props: ', this.props);
    const { match: { params } } = this.props;
    console.log(`http://localhost:8081/account/${params.accountId}`);
    const account = (await axios.get(`http://localhost:8081/account/${params.accountId}`)).data;
    this.setState({
      account,
    });
  }

  async submitUpdate(update){
    await axios.post(`http://localhost:8081/update/${this.state.account.id}`, {
      update,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshCollection();
  }

  render() {
    const {account} = this.state;

    if (account === null) return <p>Loading... </p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{account.FirstName}</h1>
            <p className="lead">{account.Surname}</p>
            <hr className="my-4" />
            <SubmitUpdate accountId={account.id} submitUpdate={this.submitUpdate} />
            <p>Notes</p>
            {
              account.AccountNotes.map((note, idx) => (
                <p className="lead" key={idx}>{note.update}</p>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
