import React, { Component } from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import auth0Client from './Auth/Auth';
import NavBar from './NavBar/NavBar';
import Callback from './Callback/Callback';
import Account from './Account/Account';
import Customers from './Customers/Customers';
import Customer from './Customer/Customer';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Welcome from './Welcome/Welcome';
import Upload from './Upload/Upload';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/callback' component={Callback}/>
          <SecuredRoute exact path='/customers'
            component={CustomersComponent}
            checkingSession={this.state.checkingSession}
          />
          <SecuredRoute exact path='/customers/:customerId'
            component={CustomerComponent}
            checkingSession={this.state.checkingSession}
          />

          <SecuredRoute exact path='/upload'
            component={UploadComponent}
            checkingSession={this.state.checkingSession}
          />

          <SecuredRoute exact path='/dashboard'
            component={DashboardComponent}
            checkingSession={this.state.checkingSession}
          />

          <SecuredRoute exact path='/accounts/:accountId'
            component={AccountComponent}
            checkingSession={this.state.checkingSession}
          />
        </Switch>
      </div>
    );
  }
}

const AccountComponent = (props) => {
  return (
    <Account {...props}
    />
  );
}

const CustomersComponent = (props) => {
  return (
    <Customers {...props}
    />
  );
}

const CustomerComponent = (props) => {
  return (
    <Customer {...props}
    />
  );
}

const UploadComponent = (props) => {
  return (
    <Upload {...props}
    />
  );
}

const DashboardComponent = (props) => {
  return (
    <Dashboard {...props}
    />
  );
}

export default withRouter(App);
