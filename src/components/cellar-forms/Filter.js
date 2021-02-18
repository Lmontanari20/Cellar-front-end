import { Form, Row, Col, Button, Container } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import React from "react";
import WineTypes from "../../WineTypes";
import WineSizes from "../../WineSizes";

export default class Filter extends React.Component {
  state = {
    filteredBottles: [],
  };

  selectOptions = () => {
    let types = Object.keys(WineTypes);
    return types.map((type) => <option key={type}>{type}</option>);
  };

  sizeOptions = () => {
    const sizes = Object.keys(WineSizes);
    return sizes.map((size) => <option key={size}>{size}</option>);
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
      if (e.target.filterType.checked) {
        this.props.sections[i].bottles.forEach((bottle) => {
          bottle.wine.wineType === e.target.type.value &&
            filteredBottles.push(bottle);
        });
      }
      if (e.target.filterSize.checked) {
        this.props.sections[i].bottles.forEach((bottle) => {
          bottle.size === e.target.size.value && filteredBottles.push(bottle);
        });
      }
      if (e.target.filterYear.checked) {
        this.props.sections[i].bottles.forEach((bottle) => {
          bottle.wine.year === parseInt(e.target.year.value) &&
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
                <Form.Check name="filterType" inline label="Filter Type" />
                <Form.Control name="type" as="select">
                  {this.selectOptions()}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form.Group>
                <Form.Check inline name="filterSize" label="Filter Size" />
                <Form.Control name="size" as="select">
                  {this.sizeOptions()}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Check inline name="filterYear" label="Filter Year" />
                <NumericInput
                  className="form-control"
                  value={2016}
                  max={2021}
                  min={300}
                  name="year"
                ></NumericInput>
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
