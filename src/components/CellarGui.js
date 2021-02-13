import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import Section from "./Section";

// change "Add Section" to "Modify Sections"
// can add section, or toggle rearrange
// rearrange changes static on each section to false
// untoggle rearrange saves current coords to database to
// persist section arrangement

// this.state.sections should be set on componentDidMount
// where each i is the section id, other attributes are obv,
// static is true to start, toggled off by toggle rearrange

class MyFirstGrid extends Component {
  state = {
    sections: [
      {
        i: "a",
        sectionName: "section1",
        x: 0,
        y: 0,
        w: 7,
        h: 5,
        static: true,
      },
      {
        i: "b",
        sectionName: "section2",
        x: 1,
        y: 0,
        w: 3,
        h: 2,
        minW: 2,
        maxW: 4,
      },
      { i: "c", sectionName: "section3", x: 4, y: 0, w: 1, h: 2 },
    ],
  };

  sections = () => {
    return this.state.sections.map((section) => {
      return (
        <div key={section.i}>
          <Section sectionName={section.sectionName} width={section.w} />
        </div>
      );
    });
  };
  render() {
    // each div below is a section component
    // each section component will have many
    // cell components
    //
    // x and y coords on sections will need to be states
    // coord states need to be persisted, maybe on save button click?
    // actually... entire layout could be state, where static is toggled
    // on rearrange cellar button click.
    return (
      <GridLayout
        className="layout"
        layout={this.state.sections}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {this.sections()}
        {/* <div key="a">
          <Section />
        </div>
        <div key="b">b</div>
        <div key="c">c</div> */}
      </GridLayout>
    );
  }
}

export default MyFirstGrid;
