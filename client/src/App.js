import { Security, ImplicitCallback } from "@okta/okta-react";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MessageList from "./components/MessageList";

import logo from "./logo.svg";
import "./App.css";
import Home from "./routes/Home";

const yourOktaDomain = "dev-657184.oktapreview.com";
const clientId = "0oafvmim6lHM5UqLH0h7";

const config = {
  issuer: `https://${yourOktaDomain}/oauth2/default`,
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "{clientId}"
};

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
            issuer={config.issuer}
            client_id={config.client_id}
            redirect_uri={config.redirect_uri}
          >
            <Route path="/" exact={true} component={Home} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <MessageList />
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
