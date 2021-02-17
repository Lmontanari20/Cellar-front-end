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
  sectionsToGrid = () => {
    return this.props.sections.map((section) => {
      return {
        i: `${section.id}`,
        name: section.name,
        bottles: section.bottles,
        x: section.x,
        y: section.y,
        w: section.columns * 0.51 - (section.columns - 12) * 0.0265,
        actualW: section.columns,
        h: 1 + section.rows * 0.6,
        actualH: section.rows,
        static: this.props.static,
        isResizable: false,
      };
    });
  };

  sections = () => {
    return this.props.sections.map((section) => {
      return (
        <div key={section.id}>
          <Section
            name={section.name}
            key={section.name}
            width={section.columns}
            height={section.rows}
            bottles={section.bottles}
          />
        </div>
      );
    });
  };

  render() {
    // be sure to "unbound" vertical GridLayout size when dragging grid items
    return (
      <div className="gui-div">
        {this.props.sections ? (
          <GridLayout
            className="layout"
            layout={this.sectionsToGrid()}
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
