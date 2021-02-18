import { Form, Row, Col, Button, Container } from "react-bootstrap";

const Sections = (props) => {
  props.filteredBottles && props.resetFilteredBottles();
  const newY = () => {
    if (props.sections) {
      return (
        0.1 +
        Math.max(
          ...props.sections.map(
            (section) => section.y + (1 + 0.6 * section.rows)
          )
        )
      );
    } else {
      return 0;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const yVal = newY();
    console.log("y-val", yVal);
    const section = {
      name: e.target.name.value,
      cellar_id: props.cellarId,
      rows: parseInt(e.target.rows.value),
      columns: parseInt(e.target.columns.value),
      x: 0,
      y: yVal,
    };
    console.log(section);
    postSection(section);
  };

  const postSection = (section) => {
    fetch("http://localhost:3000/sections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(section),
    })
      .then((res) => res.json())
      .then(() => {
        props.updateSectionsState(props.userId);
      });
  };

  return (
    <div className="form-div">
      <Container>
        <h2>Add Section</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Section Name</Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Label>Number of Columns</Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Label>Number of Rows</Form.Label>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Control placeholder="Section Name" name="name" />
            </Col>
            <Col xs={3}>
              <Form.Control placeholder="Width" name="columns" />
            </Col>
            <Col xs={3}>
              <Form.Control placeholder="Height" name="rows" />
            </Col>
            <Col>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Row>
        </Form>
        <Row className="mt-3">
          <Col>
            <button
              className={`btn ${
                props.static ? "btn-primary" : "btn-secondary"
              }`}
              onClick={props.toggleStatic}
            >
              toggle static
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sections;
