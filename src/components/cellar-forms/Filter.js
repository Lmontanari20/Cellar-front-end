import { Form, Row, Col, Button, Container } from "react-bootstrap";
import React from "react";

export default class Filter extends React.Component {
  state = {
    filteredBottles: [],
  };

  selectOptions = () => {
    let types = [
      "Cabernet Sauvignon",
      "Cabernet Franc",
      "Malbec",
      "Grenache",
      "Syrah",
      "Mourvedre",
      "Merlot",
      "Syrah",
      "Zinfandel",
    ];
    return types.map((type) => <option key={type}>{type}</option>);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let filteredBottles = [];
    for (let i = 0; i < this.props.sections.length; i++) {
      if (e.target.name.value !== "") {
        this.props.sections[i].bottles.forEach((bottle) => {
          bottle.wine.name === e.target.name.value &&
            filteredBottles.push(bottle);
        });
      }
      if (e.target.winery.value !== "") {
        this.props.sections[i].bottles.forEach((bottle) => {
          bottle.wine.winery === e.target.winery.value &&
            filteredBottles.push(bottle);
        });
      }
      if (e.target.type.value !== "") {
        this.props.sections[i].bottles.forEach((bottle) => {
          bottle.wine.wineType === e.target.type.value &&
            filteredBottles.push(bottle);
        });
      }
    }
    console.log(filteredBottles);
    this.props.setFilteredBottles(filteredBottles);
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mt-2">
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Wine Name"
                  name="name"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Winery</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Winery"
                  name="winery"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control name="type" as="select">
                  {this.selectOptions()}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <div className="mt-4 butt-div" style={{ textAlign: "right" }}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
