import React, { Fragment } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import CurrencyInput from "react-currency-input-field";

const AddBottle = () => {
  const sizeOptions = () => {
    const sizes = [
      "Standard (750ml)",
      "Split/Piccolo (187.5ml)",
      "Half/Demi (375 ml)",
      "Half-liter/Jennie (500ml)",
      "Liter (1000ml)",
      "Magnum (1.5 L)",
      "Double Magnum (3 L)",
      "Rehoboam (Jeroboam in Bordeaux) (4.5 L)",
      "Methuselah or Imperial (Bordeaux) (6 L)",
      "Salmanazar (9 L)",
      "Balthazar (12 L)",
      "Nebuchadnezzar (15 L)",
      "Melchior (18 L)",
      "Solomon (20 L)",
      "Sovereign (26 L)",
      "Primat/Goliath (27 L)",
      "Melchizedek/Midas (30 L)",
    ];
    return sizes.map((size) => <option>{size}</option>);
  };

  const typeOptions = () => {
    const types = [
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
    return types.map((type) => <option>{type}</option>);
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Wine Name"
              ></Form.Control>
              <Form.Label className="mt-2">Winery</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Winery"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control as="select">{typeOptions()}</Form.Control>
              <Form.Label className="mt-2">Year</Form.Label>
              <NumericInput
                className="form-control"
                value={2016}
                max={2021}
                min={300}
              ></NumericInput>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control as="select">{sizeOptions()}</Form.Control>
              <Form.Label className="mt-2">Price</Form.Label>
              <CurrencyInput
                className="form-control"
                name="price"
                placeholder="$12.34"
                prefix="$"
                decimalsLimit={2}
              ></CurrencyInput>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-end" style={{ textAlign: "right" }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default AddBottle;
