import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { clientId, yourOktaDomain } from "./util/default-config";
import logo from "./logo.svg";
import "./App.css";
import config from "./util/default-config";
import Home from "./routes/Home";
import Messages from "./components/Messages";
import Navbar from "./containers/Navbar";
import Profile from "./components/Profile";

// const config = {
//   issuer: `https://${yourOktaDomain}/oauth2/default`,
//   redirect_uri: window.location.origin + "/implicit/callback",
//   client_id: "{clientId}"
// };

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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          The server says.... <b>{this.state.message}</b>
        </p>
        <Router>
          <Security
            issuer={config.oidc.issuer}
            client_id={config.oidc.clientId}
            redirect_uri={config.oidc.redirectUri}
          >
            <Navbar />
            <Container text style={{ marginTop: "7em" }}>
              <Route path="/" exact component={Home} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <SecureRoute path="/messages" component={Messages} />
              <SecureRoute path="/profile" component={Profile} />
            </Container>
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
