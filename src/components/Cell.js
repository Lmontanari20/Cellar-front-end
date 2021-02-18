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

  render() {
    return (
      <div className="bottle-cell">
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
