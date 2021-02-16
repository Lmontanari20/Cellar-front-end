import React, { Component, Fragment } from "react";
import FormContainer from "./FormContainer";
import CellarGui from "./CellarGui";

class GuiPage extends Component {
  // state = {
  //   static: true,
  //   sections: [
  //     {
  //       id: "1",
  //       sectionName: "Section1",
  //       x: 0,
  //       y: 0,
  //       w: 20,
  //       h: 1,
  //       bottles: [
  //         {
  //           id: 1,
  //           type: "red",
  //           x: 1,
  //           y: 1,
  //         },
  //         {
  //           id: 2,
  //           type: "rose",
  //           x: 2,
  //           y: 1,
  //         },
  //         {
  //           id: 3,
  //           type: "white",
  //           x: 3,
  //           y: 1,
  //         },
  //       ],
  //     },
  //     {
  //       id: "2",
  //       sectionName: "Section2",
  //       x: 0,
  //       y: 1.6,
  //       w: 8,
  //       h: 12,
  //       bottles: [
  //         {
  //           id: 1,
  //           type: "red",
  //           x: 3,
  //           y: 3,
  //         },
  //         {
  //           id: 2,
  //           type: "rose",
  //           x: 3,
  //           y: 4,
  //         },
  //         {
  //           id: 3,
  //           type: "white",
  //           x: 5,
  //           y: 6,
  //         },
  //       ],
  //     },
  //     { id: "3", sectionName: "Section3", x: 5, y: 1.6, w: 8, h: 12 },
  //     // { id: "4", sectionName: "Section4", x: 0, y: 100, w: 8, h: 12 },
  //     // when user creates new section, x should be 0, and y should be
  //     // equal to the maximum y+h of the sections
  //   ],
  // };

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

  // toggleStatic = () => {
  //   // if toggle back to static = true,
  //   // update sections x and y coords with last updated positions
  //   // pass function from GuiPage down to CellarGui to call inside
  //   this.setState((prevState) => {
  //     return {
  //       static: !prevState.static,
  //     };
  //   });
  // };

  // handleMove = (layout) => {
  //   let currentSection;
  //   const newPositions = layout.map((section) => {
  //     currentSection = this.state.sections.find((s) => s.id === section.i);
  //     currentSection.x = section.x;
  //     currentSection.y = section.y;
  //     return currentSection;
  //   });
  //   this.setState({
  //     sections: newPositions,
  //   });
  // };

  // componentDidMount() {
  //   // fetch user.sections
  //   // pass section data as prop to CellarGui
  // }

  render() {
    return (
      <Fragment>
        <FormContainer
          selectedForm={this.props.selectedForm}
          toggleStatic={
            this.props.selectedForm === "sections"
              ? this.props.toggleStatic
              : undefined
          }
        />
        <CellarGui
          sections={this.props.sections}
          static={this.props.static}
          handleMove={this.props.handleMove}
        />
      </Fragment>
    );
  }
}

export default GuiPage;
