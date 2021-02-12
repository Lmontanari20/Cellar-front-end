import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WineNav from "./components/WineNav";
import GuiPage from "./components/GuiPage";
import Bottles from "./components/Bottles";
import LogInContainer from "./components/LogInContainer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getSuggestedQuery } from "@testing-library/react";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    alert: false,
  };

  //fetch calls
  logIn = (username) => {
    // get user data
    let url = `http://localhost:3000/users/${username}`;
    fetch(url)
      .then((res) => res.json())
      .then((user) => {
        if (user.message) {
          alert(user.message);
          return;
        }
        this.setState({
          isLoggedIn: true,
          username: user.username,
        });
      });
  };

  signUp = (username) => {
    // POST new user
    // setState loggedIn true, currentUsername username
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({ username: username }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message) {
          alert(user.message);
          return;
        }
        this.setState({
          isLoggedIn: true,
          username: username,
        });
      });
  };

  renderMessage = (message) => {};

  logOut = () => {
    this.setState({
      isLoggedIn: false,
      username: null,
    });
  };

  render() {
    return (
      <Fragment>
        <Router>
          <header className="App-header">
            <WineNav
              loggedIn={this.state.isLoggedIn}
              handleLogOut={this.logOut}
            />
          </header>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <GuiPage selectedForm={null} loggedIn={this.state.isLoggedIn} />
              )}
            />
            <Route
              path="/add-section"
              component={() => <GuiPage selectedForm="add-section" />}
            />
            <Route
              path="/add-bottle"
              component={() => <GuiPage selectedForm="add-bottle" />}
            />
            <Route
              path="/filter"
              component={() => <GuiPage selectedForm="filter" />}
            />
            <Route path="/all-bottles" component={Bottles} />
            <Route path="/log-in">
              {this.state.isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <LogInContainer formType="log-in" logIn={this.logIn} />
              )}
            </Route>
            <Route path="/sign-up">
              {this.state.isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <LogInContainer formType="sign-up" logIn={this.signUp} />
              )}
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
