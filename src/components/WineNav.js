import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useRoutes, A } from "hookrouter";

const WineNav = (props) => {
  return (
    <Fragment>
      <Navbar bg="primary" variant="dark">
        <A href="/">
          <Navbar.Brand>Cellr</Navbar.Brand>
        </A>
        <Nav className="mr-auto">
          {props.loggedIn ? (
            <Fragment>
              <A href="/add-section">
                <Nav.Link>Add Section</Nav.Link>
              </A>
              <A href="/add-bottle">
                <Nav.Link>Add Bottle</Nav.Link>
              </A>
              <A href="/filter">
                <Nav.Link>Filter</Nav.Link>
              </A>
              <A href="/all-bottles">
                <Nav.Link>All Bottles</Nav.Link>
              </A>
            </Fragment>
          ) : null}
        </Nav>
        <Nav>
          <A href="/log-in">
            <Nav.Link>Log In</Nav.Link>
          </A>
          <A href="/sign-up">
            <Nav.Link>Sign Up</Nav.Link>
          </A>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

export default WineNav;
