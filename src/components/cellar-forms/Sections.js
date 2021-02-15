import React, { Fragment } from "react";

const Sections = (props) => {
  return (
    <Fragment>
      <button className="btn btn-primary" onClick={props.toggleStatic}>
        toggle static
      </button>
    </Fragment>
  );
};

export default Sections;
