import React, { Component, Fragment } from "react";
import FormContainer from "./FormContainer";
import CellarGui from "./CellarGui";

class GuiPage extends Component {
  state = {
    sections: [
      { id: "1", sectionName: "Section1", x: 0, y: 0, w: 5, h: 10 },
      { id: "2", sectionName: "Section2", x: 0, y: 0, w: 8, h: 4 },
      { id: "3", sectionName: "Section3", x: 0, y: 0, w: 2, h: 2 },
    ],
  };

  // state = {
  //   sections: [
  //     {
  //       i: "a",
  //       sectionName: "section1",
  //       x: 0,
  //       y: 0,
  //       w: 10 * 0.255,
  //       h: 1 + 12 * 0.6,
  //       minW: 10 * 0.255,
  //       maxW: 10 * 0.255,
  //       actualWidth: 10,
  //       maxH: 1 + 12 * 0.6,
  //       minH: 1 + 12 * 0.6,
  //       actualHeight: 12,
  //       static: false,
  //     },

  componentDidMount() {
    // fetch user.sections
    // pass section data as prop to CellarGui
  }

  render() {
    return (
      <Fragment>
        <FormContainer selectedForm={this.props.selectedForm} />
        <CellarGui sections={this.state.sections} />
      </Fragment>
    );
  }
}

export default GuiPage;
