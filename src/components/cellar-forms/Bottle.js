import { Component } from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
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
        // Selected cell has a bottle
        this.setState({
          name: this.props.selectedBottle.wine.name,
          winery: this.props.selectedBottle.wine.winery,
          section: Object.keys(this.props.selectedCell)[0],
          type: this.props.selectedBottle.wine.wineType,
          year: this.props.selectedBottle.wine.year,
          row: `${this.props.selectedBottle.row}`,
          column: `${this.props.selectedBottle.column}`,
          size: this.props.selectedBottle.size,
          price: this.props.selectedBottle.price,
          formType: "Edit Bottle",
        });
      } else {
        // Selected cell is empty
        this.setState({
          name: "",
          winery: "",
          section: `${Object.keys(this.props.selectedCell)[0]}`,
          type: Object.keys(WineTypes)[0],
          year: 2016,
          row: `${Object.values(this.props.selectedCell)[0][1]}`,
          column: `${Object.values(this.props.selectedCell)[0][0]}`,
          size: Object.keys(WineSizes)[0],
          price: "",
          formType: "Add Bottle",
        });
      }
    } else {
      this.setState({
        name: "",
        winery: "",
        section: this.props.sections
          ? this.props.selectedSection
            ? this.props.selectedSection
            : this.props.sections[0].name
          : "",
        type: Object.keys(WineTypes)[0],
        year: 2016,
        row: "",
        column: "",
        size: Object.keys(WineSizes)[0],
        price: "",
        formType: "Add Bottle",
      });
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

  findBottle = (sectionName, row, column) => {
    const foundSection = this.props.sections.find(
      (section) => section.name === sectionName
    );
    const foundBottle = foundSection.bottles.find(
      (bottle) => `${bottle.row}` === row && `${bottle.column}` === column
    );
    if (foundBottle) {
      const cell = { [sectionName]: [parseInt(column), parseInt(row)] };
      this.props.handleCellSelect(cell, foundBottle);
    }
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
    } else if (field === "price") {
      this.setState({
        price: e,
      });
    } else if (field === "section") {
      console.log(e.target.name, e.target.value);
      this.setState({
        [e.target.name]: e.target.value,
        column: "",
        row: "",
      });
      this.props.handleCellSelect(null, null, null, e.target.value);
    } else if (field === "column") {
      this.setState({
        [e.target.name]: e.target.value,
      });
      this.findBottle(this.state.section, this.state.row, e.target.value);
    } else if (field === "row") {
      this.setState({
        [e.target.name]: e.target.value,
      });
      console.log(this.state.section, e.target.value, this.state.column);
    }
  };

  render() {
    return (
      <div className="form-div">
        <Container>
          <h2>{this.state.formType}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col xs={4}>
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
                </Form.Group>
              </Col>
              <Col xs={4}>
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
                </Form.Group>
              </Col>
              <Col xs={4} className="butt-col">
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
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={4}>
                <Form.Label>Section</Form.Label>
              </Col>
              <Col xs={2}>
                <Form.Label>Column Number</Form.Label>
              </Col>
              <Col xs={2}>
                <Form.Label>Row Number</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={4}>
                <Form.Control
                  as="select"
                  name="section"
                  value={this.state.section}
                  onChange={(e) => this.handleChange(e, "section")}
                >
                  {this.sections()}
                </Form.Control>
              </Col>
              <Col xs={2}>
                <Form.Control
                  type="text"
                  placeholder="X Coordinate"
                  name="column"
                  value={this.state.column}
                  onChange={(e) => this.handleChange(e, "column")}
                ></Form.Control>
              </Col>
              <Col xs={2}>
                <Form.Control
                  type="text"
                  placeholder="Y Coordinate"
                  name="row"
                  value={this.state.row}
                  onChange={(e) => this.handleChange(e, "row")}
                ></Form.Control>
              </Col>
              <Col xs={2}>
                <Button variant="primary" type="submit">
                  {this.state.formType}
                </Button>
              </Col>
              {this.state.formType === "Edit Bottle" ? (
                <Col xs={2} style={{ textAlign: "right" }}>
                  <Button variant="danger">Drink Bottle</Button>
                </Col>
              ) : null}
            </Form.Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Bottle;
