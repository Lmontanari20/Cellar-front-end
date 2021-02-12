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

export default class App extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    redirect: null,
  };

  logIn = (username) => {
    // GET user data
    console.log("logging in");
    this.setState({
      isLoggedIn: true,
      username: username,
    });
  };

  signUp = (username) => {
    // POST new user
    // setState loggedIn true, currentUsername username
    this.setState({
      isLoggedIn: true,
      username: username,
    });
    console.log("signing up");
  };

  render() {
    return (
      <Fragment>
        <Router>
          <header className="App-header">
            <WineNav loggedIn={this.state.isLoggedIn} />
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

// function App() {
//   const [loggedIn, setLoggedIn] = useState(true);
//   const [currentUserName, setCurrentUsername] = useState(null);

//   const logIn = (username) => {
//     // GET user data
//     console.log("logging in");
//     setLoggedIn(true);
//     setCurrentUsername(username);
//   };

//   const signUp = (username) => {
//     // POST new user
//     // setState loggedIn true, currentUsername username
//     console.log("signing up");
//   };

//   const routes = {
//     "/": () => <GuiPage selectedForm={null} loggedIn={loggedIn} />,
//     "/add-section": () => <GuiPage selectedForm="add-section" />,
//     "/add-bottle": () => <GuiPage selectedForm="add-bottle" />,
//     "/filter": () => <GuiPage selectedForm="filter" />,
//     "/all-bottles": () => <Bottles />,
//     "/log-in": () => <LogInContainer formType="log-in" logIn={logIn} />,
//     "/sign-up": () => <LogInContainer formType="sign-up" logIn={signUp} />,
//   };

//   const routeResult = useRoutes(routes);

//   return (
//     <Fragment>
//       <WineNav loggedIn={loggedIn}></WineNav>
//       {routeResult}
//     </Fragment>
//   );
// }
