import { Container } from "react-bootstrap";
import AddSection from "./cellar-forms/AddSection";
import AddBottle from "./cellar-forms/AddBottle";
import Filter from "./cellar-forms/Filter";

const FormContainer = (props) => {
  const currentForm = () => {
    switch (props.selectedForm) {
      case "add-section":
        return <AddSection />;
      case "add-bottle":
        return <AddBottle />;
      case "filter":
        return <Filter />;
      default:
        return null;
    }
  };

  return <Container className="mt-4">{currentForm()}</Container>;
};

export default FormContainer;
