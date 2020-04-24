import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth/Auth';
import NavBar from './NavBar/NavBar';
import Callback from './Callback/Callback';
import Collections from './Collections/Collections';
import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute exact path='/collections'
          component={CollectionsComponent}
          checkingSession={this.state.checkingSession}
        />
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

export default withRouter(App);
