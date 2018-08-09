import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import { withAuth } from '@okta/okta-react';

class ProfileButton extends Component {
  state = {
    authenticated: null,
    menuAnchorEl: null,
  };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    this.setState({ authenticated })

  }

  viewProfile() {
      console.log ('View Profile');
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated == null) return <Button color="inherit" disabled="true">Profile</Button>;
    if (!authenticated) return <Button color="inherit" disabled="true">Profile</Button>;

    return (
      <div>
          <Button color="white" component = {Link} to="/profile">Profile</Button>
      </div>
    );
  }
}

export default withAuth(ProfileButton);