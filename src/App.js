import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth/Auth';
import NavBar from './NavBar/NavBar';
import Callback from './Callback/Callback';
import Collections from './Collections/Collections';
import Accounts from './Accounts/Accounts';
import Account from './Account/Account';
import Customers from './Customers/Customers';
import Customer from './Customer/Customer';
import Collection from './Collection/Collection';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Welcome from './Welcome/Welcome';

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
        <Route exact path='/' component={Welcome} />
        {/*<Route exact path='/' component={Welcome}/>*/}
        <Route exact path='/callback' component={Callback}/>

        {/*
        <SecuredRoute exact path='/collections'
          component={CollectionsComponent}
          checkingSession={this.state.checkingSession}
        />
        <SecuredRoute exact path='/collection/:collectionId'
          component={CollectionComponent}
          checkingSession={this.state.checkingSession}
        />
        */}

        <Route exact path='/collections' component={CollectionsComponent}/>
        <Route exact path='/collection/:collectionId' component={CollectionComponent}/>
        <Route exact path='/accounts' component={AccountsComponent}/>
        <Route exact path='/customers' component={CustomersComponent}/>
        {/*<Route exact path='/customer/:accountId' component={CustomerAccountComponent}/>*/}
        <Route exact path='/customer/:customerId' component={CustomerComponent}/>

      </div>
    );
  }
}

const CollectionsComponent = (props) => {
  return (
    <Collections {...props}
    />
  );
}

const CollectionComponent = (props) => {
  return (
    <Collection {...props}
    />
  );
}

const AccountsComponent = (props) => {
  return (
    <Accounts {...props}
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

const CustomerAccountComponent = (props) => {
  return (
    <Account {...props}
    />
  );
}

export default withRouter(App);
