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

  componentDidUpdate(previousProps) {
    if (previousProps.static !== this.props.static) {
      console.log(this.props.static);
      const sections = this.state.sections.map((section) => {
        let arrangeableSection = Object.assign({}, section);
        arrangeableSection.static = this.props.static;
        return arrangeableSection;
      });
      this.setState({
        sections: sections,
      });
    }
    if (previousProps.sections !== this.props.sections) {
      this.setSections();
    }
  }

  setSections = () => {
    const sections = this.props.sections.map((section) => {
      return {
        i: section.id,
        sectionName: section.sectionName,
        bottles: section.bottles,
        x: section.x,
        y: section.y,
        w: section.w * 0.51 - (section.w - 12) * 0.0265,
        actualW: section.w,
        h: 1 + section.h * 0.6,
        actualH: section.h,
        static: this.props.static,
        isResizable: false,
      };
    });
    this.setState({
      sections: sections,
    });
  };

  componentDidMount() {
    this.setSections();
  }

  sections = () => {
    return this.state.sections.map((section) => {
      return (
        <div key={section.i}>
          <Section
            sectionName={section.sectionName}
            key={section.sectionName}
            width={section.actualW}
            height={section.actualH}
            bottles={section.bottles}
          />
        </div>
      );
    });
  };

  render() {
    // be sure to "unbound" vertical GridLayout size when dragging
    // Grid Items
    return (
      <div className="gui-div">
        {this.state.sections ? (
          <GridLayout
            className="layout"
            layout={this.state.sections}
            cols={24}
            rowHeight={30}
            width={1200}
            onLayoutChange={(layout) => this.props.handleMove(layout)}
          >
            {this.sections()}
          </GridLayout>
        ) : null}
      </div>
    );
  }
}

export default CellarGui;
