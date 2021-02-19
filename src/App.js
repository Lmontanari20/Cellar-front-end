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
import Bottle from "./components/cellar-forms/Bottle";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    userId: null,
    cellarId: null,
    static: true,
    sections: null,
    filteredBottles: null,
    guiHidden: true,
    selectedCell: null,
    selectedBottle: null,
    selectedSection: null,
  };

  resetFilteredBottles = () => {
    this.setState({ filteredBottles: null });
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
          guiHidden: false,
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
      userId: null,
      cellarId: null,
      static: true,
      sections: null,
      filteredBottles: null,
      guiHidden: true,
    });
  };

  setFilteredBottles = (filteredBottles) => {
    this.setState({ filteredBottles: filteredBottles });
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
    this.setState({ selectedCell: null, selectedBottle: null });
    let newBottle = bottle;
    newBottle.section_id = parseInt(
      this.state.sections.find((section) => {
        return section.name === bottle.section;
      }).id
    );
    delete newBottle.section;
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
      .then(() => this.fetchUserSections(this.state.userId));
  };

  fetchUserSections = (id) => {
    fetch(`http://localhost:3000/sections/${id}`)
      .then((res) => res.json())
      .then((sections) => {
        this.setState({ sections: sections });
      });
  };

  patchCoordinates = () => {
    const sectionCoordinates = this.state.sections.map((section) => {
      return {
        id: section.id,
        x: section.x,
        y: section.y,
      };
    });
    fetch(`http://localhost:3000/sections/${this.state.cellarId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({
        sections: sectionCoordinates,
      }),
    })
      .then((res) => res.json)
      .then(() => this.fetchUserSections(this.state.cellarId));
  };

  // Gui Methods
  handleCellSelect = (
    cell,
    bottle,
    deselect = null,
    selectedSection = null
  ) => {
    if (selectedSection) {
      this.setState({
        selectedSection: selectedSection,
      });
    }
    if (!this.state.static) {
      return;
    }
    if (deselect) {
      this.setState({ selectedCell: null, selectedBottle: null });
    } else {
      this.setState({
        selectedCell: cell,
        selectedBottle: bottle,
      });
    }
  };

  toggleHidden = (bool) => {
    this.setState({
      guiHidden: bool,
    });
  };

  toggleStatic = () => {
    this.setState((prevState) => {
      return {
        static: !prevState.static,
      };
    });
    !this.state.static && this.patchCoordinates();
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
              toggleHidden={this.toggleHidden}
            />
          </header>
          <Switch>
            <Route exact path="/" />
            <Route
              path="/sections"
              component={() => (
                <Sections
                  filteredBottles={this.state.filteredBottles}
                  resetFilteredBottles={this.resetFilteredBottles}
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
              path="/bottle"
              component={() => (
                <Bottle
                  bottleSubmit={this.handleBottleSubmit}
                  sections={this.state.sections}
                  selectedCell={this.state.selectedCell}
                  selectedBottle={this.state.selectedBottle}
                  handleCellSelect={this.handleCellSelect}
                  selectedSection={this.state.selectedSection}
                />
              )}
            />
            <Route
              path="/filter"
              component={() => (
                <Filter
                  setFilteredBottles={this.setFilteredBottles}
                  sections={this.state.sections}
                />
              )}
            />
            <Route
              path="/all-bottles"
              component={() => (
                <Bottles userId={this.state.userId} selectedCell />
              )}
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
          filteredBottles={this.state.filteredBottles}
          hidden={this.state.guiHidden}
          handleCellSelect={this.handleCellSelect}
          selectedCell={this.state.selectedCell}
        />
      </Fragment>
    );
  }
}
