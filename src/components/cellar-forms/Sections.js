import { Container } from "react-bootstrap";

const Sections = (props) => {
  props.filteredBottles && props.resetFilteredBottles();
  return (
    <div className="form-div">
      <Container>
        <button className="btn btn-primary" onClick={props.toggleStatic}>
          toggle static
        </button>
      </Container>
    </div>
  );
};

export default Sections;
