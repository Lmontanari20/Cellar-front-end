import React, { Fragment } from "react";
import FormContainer from "./FormContainer";

const GuiPage = (props) => {
  return (
    <Fragment>
      <FormContainer selectedForm={props.selectedForm} />
      <div>cellarGui</div>
    </Fragment>
  );
};

export default GuiPage;
