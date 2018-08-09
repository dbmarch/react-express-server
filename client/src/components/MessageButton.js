import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withAuth } from '@okta/okta-react';

class MessageButton extends Component {
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
    this.setState({ authenticated });
  }

  viewProfile() {
      console.log ('View Message');
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated == null) return <Button color="inherit" disabled="true">Message</Button>;
    if (!authenticated) return <Button color="inherit" disabled="true">Message</Button>;

    return (
      <div>
          <Button color="white" component = {Link} to="/messages">Message</Button>
      </div>
    );
  }
}

export default withAuth(MessageButton);