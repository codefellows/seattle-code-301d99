import React from 'react';
import './App.css';
//in class components import withAuth0:
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Content from './Content';

class App extends React.Component {

    render() {
      // this.props.auth0.isAuthenticated is a boolean
      // it tells us if the user is logged in
      return (
        <>
          <h1>Auth0</h1>
          {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/> }
          {this.props.auth0.isAuthenticated ? <Content/> : <h2>Please login</h2> }
        </>
      )
    }
}

export default withAuth0(App);
