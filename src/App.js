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
    static: true,
    sections: [
      {
        id: "1",
        sectionName: "Section1",
        x: 0,
        y: 0,
        w: 20,
        h: 1,
        bottles: [
          {
            id: 1,
            type: "red",
            x: 1,
            y: 1,
          },
          {
            id: 2,
            type: "rose",
            x: 2,
            y: 1,
          },
          {
            id: 3,
            type: "white",
            x: 3,
            y: 1,
          },
        ],
      },
      {
        id: "2",
        sectionName: "Section2",
        x: 0,
        y: 1.6,
        w: 8,
        h: 12,
        bottles: [
          {
            id: 1,
            type: "red",
            x: 3,
            y: 3,
          },
          {
            id: 2,
            type: "rose",
            x: 3,
            y: 4,
          },
          {
            id: 3,
            type: "white",
            x: 5,
            y: 6,
          },
        ],
      },
      { id: "3", sectionName: "Section3", x: 5, y: 1.6, w: 8, h: 12 },
      // { id: "4", sectionName: "Section4", x: 0, y: 100, w: 8, h: 12 },
      // when user creates new section, x should be 0, and y should be
      // equal to the maximum y+h of the sections
    ],
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
      currentSection = this.state.sections.find((s) => s.id === section.i);
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
              component={() => <Sections toggleStatic={this.toggleStatic} />}
            />
            <Route path="/add-bottle" component={() => <AddBottle />} />
            <Route path="/filter" component={() => <Filter />} />
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
        <CellarGui
          sections={this.state.sections}
          static={this.state.static}
          handleMove={this.handleMove}
        />
      </Fragment>
    );
  }
}
