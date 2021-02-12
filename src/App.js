import React, { useState, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WineNav from "./components/WineNav";
import GuiPage from "./components/GuiPage";
import Bottles from "./components/Bottles";
import LogInContainer from "./components/LogInContainer";
import { useRoutes } from "hookrouter";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserName, setCurrentUsername] = useState(null);

  const logIn = (username) => {
    // GET user data
    console.log("logging in");
    setLoggedIn(true);
    setCurrentUsername(username);
  };

  const signUp = (username) => {
    // POST new user
    // setState loggedIn true, currentUsername username
    console.log("signing up");
  };

  const routes = {
    "/": () => <GuiPage selectedForm={null} loggedIn={loggedIn} />,
    "/add-section": () => <GuiPage selectedForm="add-section" />,
    "/add-bottle": () => <GuiPage selectedForm="add-bottle" />,
    "/filter": () => <GuiPage selectedForm="filter" />,
    "/all-bottles": () => <Bottles />,
    "/log-in": () => <LogInContainer formType="log-in" logIn={logIn} />,
    "/sign-up": () => <LogInContainer formType="sign-up" logIn={signUp} />,
  };

  const routeResult = useRoutes(routes);

  return (
    <Fragment>
      <WineNav loggedIn={loggedIn}></WineNav>
      {routeResult}
    </Fragment>
  );
}

//   return (
//     <Fragment>
//       <Router>
//         <header className="App-header">
//           <WineNav loggedIn={loggedIn} />
//         </header>
//         <Switch>
//           <Route
//             exact
//             path="/"
//             component={() => (
//               <GuiPage selectedForm={null} loggedIn={loggedIn} />
//             )}
//           />
//           <Route
//             path="/add-section"
//             component={() => <GuiPage selectedForm="add-section" />}
//           />
//           <Route
//             path="/add-bottle"
//             component={() => <GuiPage selectedForm="add-bottle" />}
//           />
//           <Route
//             path="/filter"
//             component={() => <GuiPage selectedForm="filter" />}
//           />
//           <Route path="/all-bottles" component={Bottles} />
//           <Route
//             path="/log-in"
//             component={() => <LogInContainer formType="log-in" logIn={logIn} />}
//           />
//           <Route
//             path="/sign-up"
//             component={() => (
//               <LogInContainer formType="sign-up" logIn={signUp} />
//             )}
//           />
//         </Switch>
//       </Router>
//     </Fragment>
//   );
// }

export default App;
