import React, { Component, Fragment } from "react";
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

class CellarGui extends Component {
  state = {
    sections: null,
    // sections: [
    //   {
    //     i: "1",
    //     sectionName: "section1",
    //     x: 0,
    //     y: 0,
    //     w: 10 * 0.255,
    //     h: 1 + 5 * 0.6,
    //     minW: 10 * 0.255,
    //     maxW: 10 * 0.255,
    //     actualW: 10,
    //     maxH: 1 + 5 * 0.6,
    //     minH: 1 + 5 * 0.6,
    //     actualH: 5,
    //     static: false,
    //   },
    //   {
    //     i: "2",
    //     sectionName: "section2",
    //     x: 0,
    //     y: 0,
    //     w: 10 * 0.255,
    //     h: 1 + 2 * 0.6,
    //     minW: 10 * 0.255,
    //     maxW: 10 * 0.255,
    //     actualW: 10,
    //     maxH: 1 + 2 * 0.6,
    //     minH: 1 + 2 * 0.6,
    //     actualH: 2,
    //     static: false,
    //   },
    // ],
  };

  componentDidMount() {
    const sections = this.props.sections.map((section) => {
      return {
        i: section.id,
        sectionName: section.sectionName,
        x: section.x,
        y: section.y,
        w: section.w * 0.51,
        actualW: section.w,
        h: 1 + section.h * 0.6,
        actualH: section.h,
        static: false,
        isResizable: false,
      };
    });
    this.setState({
      sections: sections,
    });
  }

  // look into 'onLayoutChange' func from documentation to persist layouts

  sections = () => {
    return this.state.sections.map((section) => {
      return (
        <div key={section.i}>
          <Section
            sectionName={section.sectionName}
            width={section.actualW}
            height={section.actualH}
          />
        </div>
      );
    });
  };

  handleMove = (layout) => {
    console.log(layout);
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
      <Fragment>
        {this.state.sections ? (
          <GridLayout
            className="layout"
            layout={this.state.sections}
            cols={24}
            rowHeight={30}
            width={1200}
            onLayoutChange={(layout) => this.handleMove(layout)}
          >
            {this.sections()}
            {/* <div key="a">
          <Section />
        </div>
        <div key="b">b</div>
        <div key="c">c</div> */}
          </GridLayout>
        ) : null}
      </Fragment>
    );
  }
}

export default CellarGui;
