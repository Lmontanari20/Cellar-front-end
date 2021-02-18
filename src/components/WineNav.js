import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const WineNav = (props) => {
  return (
    <Fragment>
      <Navbar className="purple" variant="dark">
        <LinkContainer exact to="/">
          <Navbar.Brand>Cellr</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          {props.loggedIn ? (
            <Fragment>
              <LinkContainer to="/sections">
                <Nav.Link onClick={() => props.toggleHidden(false)}>
                  Sections
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/bottle">
                <Nav.Link onClick={() => props.toggleHidden(false)}>
                  Bottle
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/filter">
                <Nav.Link onClick={() => props.toggleHidden(false)}>
                  Filter
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/all-bottles">
                <Nav.Link onClick={() => props.toggleHidden(true)}>
                  All Bottles
                </Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : null}
        </Nav>
        <Nav>
          {!props.loggedIn ? (
            <Fragment>
              <LinkContainer to="/log-in">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sign-up">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <LinkContainer to="/">
              <Nav.Link onClick={props.handleLogOut}>Log Out</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  );
};
export default WineNav;
