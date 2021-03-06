import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { clientId, yourOktaDomain } from "./util/default-config";
import logo from "./logo.svg";
import "./App.css";
import config from "./util/default-config";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

import Messages from "./components/Messages";
import MessageList from "./components/Messages";
import Navbar from "./containers/Navbar";
import AppHeader from './containers/AppHeader';

import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import './assets/assets.css';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

class App extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    return fetch("/api/hello")
      .then(response => response.json())
      .then(response => {
        this.setState({ message: response.message });
      })
      .catch(e => {
        return console.log(e);
      });
  }

  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <CssBaseline/>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}

        <Router>
          {/* <Route path="/login" component={LoginPage} /> */}
          <Security
            issuer={config.oidc.issuer}
            client_id={config.oidc.clientId}
            redirect_uri={config.oidc.redirectUri}
          >
        <AppHeader/>
        <main className = {classes.main} >
        <p className="App-intro">
          The server says.... <b>{this.state.message}</b>
        </p>

            <Navbar />
            <Container text style={{ marginTop: "7em" }}>
              <Route path="/" exact component={Home} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <SecureRoute path="/messages" component={Messages} />
              <SecureRoute path="/profile" component={Profile} />
              <SecureRoute path="/messagelist" component = {MessageList} />
            </Container>
          </main>
          </Security>
        </Router>
      </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
