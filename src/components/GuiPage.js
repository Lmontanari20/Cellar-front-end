import React, { Fragment } from "react";
import FormContainer from "./FormContainer";
import CellarGui from "./CellarGui";

const GuiPage = (props) => {
  return (
    <Fragment>
      <FormContainer selectedForm={props.selectedForm} />
      <CellarGui />
    </Fragment>
  );
};

export default GuiPage;
