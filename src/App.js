import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-grid-layout/css/styles.css";
import WineNav from "./components/WineNav";
import Bottles from "./components/Bottles";
import Sections from "./components/cellar-forms/Sections.js";
import Filter from "./components/cellar-forms/Filter.js";
import CellarGui from "./components/CellarGui.js";
import LogInContainer from "./components/LogInContainer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AddBottle from "./components/cellar-forms/AddBottle";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    userId: null,
    cellarId: null,
    static: true,
    sections: null,
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
          userId: user.id,
          cellarId: user.cellars[0].id,
        });
        this.fetchUserSections(user.id);
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
          userId: user.id,
          cellarId: user.cellars[0].id,
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

  // fetch methods
  handleBottleSubmit = (wine, bottle) => {
    fetch("http://localhost:3000/wines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(wine),
    })
      .then((res) => res.json())
      .then((wine) => {
        this.fetchBottle(wine, bottle);
      });
  };

  fetchBottle = (wine, bottle) => {
    let newBottle = bottle;
    debugger;
    newBottle.section_id = parseInt(
      this.state.sections.find((section) => {
        return section.name === bottle.section;
      }).id
    );
    delete newBottle.section;
    console.log(newBottle);
    console.log(wine);
    newBottle.wine_id = wine.id;
    fetch("http://localhost:3000/bottles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(bottle),
    })
      .then((res) => res.json())
      .then((bottle) => console.log(bottle, wine));
  };

  fetchUserSections = (id) => {
    fetch(`http://localhost:3000/sections/${id}`)
      .then((res) => res.json())
      .then((sections) => {
        this.setState({ sections: sections });
      });
  };

  // Gui Methods

  toggleStatic = () => {
    // if toggle back to static = true,
    // update sections x and y coords with last updated positions
    // pass function from GuiPage down to CellarGui to call inside
    this.setState((prevState) => {
      return {
        static: !prevState.static,
      };
    });
  };

  handleMove = (layout) => {
    let currentSection;
    const newPositions = layout.map((section) => {
      currentSection = this.state.sections.find((s) => `${s.id}` === section.i);
      currentSection.x = section.x;
      currentSection.y = section.y;
      return currentSection;
    });

    this.setState({
      sections: newPositions,
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
            <Route exact path="/" />
            <Route
              path="/sections"
              component={() => (
                <Sections
                  toggleStatic={this.toggleStatic}
                  static={this.state.static}
                  sections={this.state.sections}
                  userId={this.state.userId}
                  cellarId={this.state.cellarId}
                  updateSectionsState={this.fetchUserSections}
                />
              )}
            />
            <Route
              path="/add-bottle"
              component={() => (
                <AddBottle bottleSubmit={this.handleBottleSubmit} />
              )}
            />
            <Route path="/filter" component={() => <Filter />} />
            <Route
              path="/all-bottles"
              component={() => <Bottles userId={this.state.userId} />}
            />
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
        <CellarGui
          sections={this.state.sections}
          static={this.state.static}
          handleMove={this.handleMove}
        />
      </Fragment>
    );
  }
}
