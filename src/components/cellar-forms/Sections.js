import { Form, Row, Col, Button, Container } from "react-bootstrap";

const Sections = (props) => {
  const handleSubmit = (e) => {
    console.log(e.target);
  };
  return (
    <div className="form-div">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Section Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Width" />
            </Col>
            <Col>
              <Form.Control placeholder="Height" />
            </Col>
            <Col>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Row>
          <Row className="mt-2">
            <Col>
              <button className="btn btn-primary" onClick={props.toggleStatic}>
                toggle static
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Sections;
