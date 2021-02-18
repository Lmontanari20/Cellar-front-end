import { Form, Row, Col, Button, Container } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import CurrencyInput from "react-currency-input-field";
import WineTypes from "../../WineTypes";
import WineSizes from "../../WineSizes";

const AddBottle = (props) => {
  const sizeOptions = () => {
    const sizes = Object.keys(WineSizes);
    return sizes.map((size) => <option key={size}>{size}</option>);
  };

  const typeOptions = () => {
    const types = Object.keys(WineTypes);
    return types.map((type) => <option key={type}>{type}</option>);
  };

  const sections = () => {
    if (props.sections) {
      return props.sections.map((section) => {
        return <option key={section.name}>{section.name}</option>;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let price = parseInt(e.target.price.value.substring(1).replaceAll(",", ""));

    let wine = {
      name: e.target.name.value,
      winery: e.target.winery.value,
      wineType: e.target.type.value,
      year: e.target.year.value,
    };
    let bottle = {
      row: e.target.row.value,
      column: e.target.column.value,
      size: e.target.size.value,
      price: price,
      section: e.target.section.value,
    };

    props.bottleSubmit(wine, bottle);
    e.target.reset();
  };

  // tooltips on the form might be cool
  // maybe Formik for validation and handling input values
  return (
    <div className="form-div">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Wine Name"
                  name="name"
                ></Form.Control>
                <Form.Label className="mt-2">Winery</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Winery"
                  name="winery"
                ></Form.Control>
                <Form.Label className="mt-2">Section</Form.Label>
                <Form.Control as="select" name="section">
                  {sections()}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control name="type" as="select">
                  {typeOptions()}
                </Form.Control>
                <Form.Label className="mt-2">Year</Form.Label>
                <NumericInput
                  className="form-control"
                  value={2016}
                  max={2021}
                  min={300}
                  name="year"
                ></NumericInput>
                <Form.Row className="mt-2">
                  <Col>
                    <Form.Label>Row Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="X Coordinate"
                      name="row"
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Column Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Y Coordinate"
                      name="column"
                    ></Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
            </Col>
            <Col className="butt-col">
              <Form.Group>
                <Form.Label>Size</Form.Label>
                <Form.Control name="size" as="select">
                  {sizeOptions()}
                </Form.Control>
                <Form.Label className="mt-2">Price</Form.Label>
                <CurrencyInput
                  className="form-control"
                  name="price"
                  placeholder="$12.34"
                  prefix="$"
                  decimalsLimit={2}
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
};

export default AddBottle;
