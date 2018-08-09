import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from "../util/helpers";

class MessageButton extends Component {
  state = {
    authenticated: null,
    user: null,
    menuAnchorEl: null,
  };
  constructor(props) {
    super(props);
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    this.checkAuthentication();
  }

//   async checkAuthentication() {
//     const authenticated = await this.props.auth.isAuthenticated();
//     const user = await this.props.auth.getUser();
//     this.setState({ authenticated, user });
// }

  viewProfile() {
      console.log ('View Message');
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated == null) return <Button color="red" disabled="true">Message</Button>;
    if (!authenticated) return <Button color="yellow" disabled="true">Message</Button>;

    return (
      <div>
          <Button color="white" component = {Link} to="/messages">Message</Button>
      </div>
    );
  }
}

export default withAuth(MessageButton);