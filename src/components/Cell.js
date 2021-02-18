import React, { Component } from "react";
import WineTypes from "../WineTypes";

class Cell extends Component {
  state = {};

  bottleType = () => {
    if (this.props.bottle) {
      return WineTypes[this.props.bottle.wine.wineType];
    } else {
      return "empty";
    }
  };

  handleCellSelect = () => {
    if (this.isCellSelected()) {
      this.props.handleCellSelect(
        this.props.cellAttributes,
        this.props.bottle,
        true
      );
    } else {
      this.props.handleCellSelect(this.props.cellAttributes, this.props.bottle);
    }
  };

  // cellAttributes = { [this.props.name]: [x, y] }

  isCellSelected = () => {
    if (this.props.selectedCell) {
      return (
        Object.keys(this.props.selectedCell)[0] ===
          Object.keys(this.props.cellAttributes)[0] &&
        Object.values(this.props.selectedCell)[0][0] ===
          Object.values(this.props.cellAttributes)[0][0] &&
        Object.values(this.props.selectedCell)[0][1] ===
          Object.values(this.props.cellAttributes)[0][1]
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div
        className={
          this.isCellSelected() ? "bottle-cell selected" : "bottle-cell"
        }
        onClick={this.handleCellSelect}
      >
        {this.props.filteredBottles &&
        this.props.filteredBottles.find(
          (bottle) => bottle === this.props.bottle
        ) ? (
          <img
            style={{ backgroundColor: "#7936f5" }}
            src={process.env.PUBLIC_URL + `/bottle-${this.bottleType()}.png`}
            alt={`${this.bottleType()} wine`}
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + `/bottle-${this.bottleType()}.png`}
            alt={`${this.bottleType()} wine`}
          />
        )}
      </div>
    );
  }
}

export default Cell;
