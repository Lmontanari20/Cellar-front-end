import { Component } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import CurrencyInput from "react-currency-input-field";
import WineTypes from "../../WineTypes";
import WineSizes from "../../WineSizes";

class Bottle extends Component {
  state = {
    name: "",
    winery: "",
    section: this.props.sections ? this.props.sections[0].name : "",
    type: Object.keys(WineTypes)[0],
    year: 2016,
    row: "",
    column: "",
    size: Object.keys(WineSizes)[0],
    price: "",
    formType: "Add Bottle",
  };

  componentDidMount() {
    if (this.props.selectedCell) {
      if (this.props.selectedBottle) {
        this.setState({
          formType: "Edit Bottle",
          name: this.props.selectedBottle.wine.name,
          winery: this.props.selectedBottle.wine.winery,
          section: Object.keys(this.props.selectedCell)[0],
          type: this.props.selectedBottle.wine.wineType,
          year: this.props.selectedBottle.wine.year,
          row: `${this.props.selectedBottle.row}`,
          column: `${this.props.selectedBottle.column}`,
          size: this.props.selectedBottle.size,
          price: this.props.selectedBottle.price,
        });
      }
    }
  }

  sizeOptions = () => {
    const sizes = Object.keys(WineSizes);
    return sizes.map((size) => <option key={size}>{size}</option>);
  };

  typeOptions = () => {
    const types = Object.keys(WineTypes);
    return types.map((type) => <option key={type}>{type}</option>);
  };

  sections = () => {
    if (this.props.sections) {
      return this.props.sections.map((section) => {
        return <option key={section.name}>{section.name}</option>;
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let price = parseInt(this.state.price.replaceAll(",", ""));

    let wine = {
      name: this.state.name,
      winery: this.state.winery,
      wineType: this.state.type,
      year: this.state.year,
    };
    let bottle = {
      row: this.state.row,
      column: this.state.column,
      size: this.state.size,
      price: price,
      section: this.state.section,
    };

    console.log(wine, bottle);
    this.props.bottleSubmit(wine, bottle);

    this.setState({
      name: "",
      winery: "",
      section: this.props.sections[0].name,
      type: Object.keys(WineTypes)[0],
      year: 2016,
      row: "",
      column: "",
      size: Object.keys(WineSizes)[0],
      price: "",
    });
  };

  handleChange = (e, field = null) => {
    if (!field) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (field === "year") {
      this.setState({
        year: e,
      });
    } else {
      this.setState({
        price: e,
      });
    }
  };

  render() {
    return (
      <div className="form-div">
        <Container>
          <h2>{this.state.formType}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Wine Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></Form.Control>
                  <Form.Label className="mt-2">Winery</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Winery"
                    name="winery"
                    value={this.state.winery}
                    onChange={this.handleChange}
                  ></Form.Control>
                  <Form.Label className="mt-2">Section</Form.Label>
                  <Form.Control
                    as="select"
                    name="section"
                    value={this.state.section}
                    onChange={this.handleChange}
                  >
                    {this.sections()}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    name="type"
                    as="select"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    {this.typeOptions()}
                  </Form.Control>
                  <Form.Label className="mt-2">Year</Form.Label>
                  <NumericInput
                    className="form-control"
                    value={this.state.year}
                    max={2021}
                    min={300}
                    name="year"
                    onChange={(e) => this.handleChange(e, "year")}
                  ></NumericInput>
                  <Form.Row className="mt-2">
                    <Col>
                      <Form.Label>Column Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="X Coordinate"
                        name="column"
                        value={this.state.column}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Row Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Y Coordinate"
                        name="row"
                        value={this.state.row}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </Col>
              <Col className="butt-col">
                <Form.Group>
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    name="size"
                    as="select"
                    value={this.state.size}
                    onChange={this.handleChange}
                  >
                    {this.sizeOptions()}
                  </Form.Control>
                  <Form.Label className="mt-2">Price</Form.Label>
                  <CurrencyInput
                    className="form-control"
                    name="price"
                    placeholder="$12.34"
                    prefix="$"
                    decimalsLimit={2}
                    value={this.state.price}
                    onValueChange={(e) => this.handleChange(e, "price")}
                  ></CurrencyInput>
                </Form.Group>
                <div className="mt-4 butt-div" style={{ textAlign: "right" }}>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Bottle;
