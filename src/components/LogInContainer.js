import { Container, Form, Row, Col, Button } from "react-bootstrap";

// this.props.formType == "log-in" || "sign-up"

const LogInContainer = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
    props.logIn(e.target.username.value);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={4}>
          <h2>{props.formType === "log-in" ? "Log In" : "Sign Up"}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Username"
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInContainer;
