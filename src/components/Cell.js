import React, { Component, Fragment } from "react";

class Cell extends Component {
  state = {};
  bottleColors = {
    "Cabernet Sauvignon": "red",
    "Cabernet Franc": "red",
    "Malbec": "red",
    "Grenache": "red",
    "Syrah": "red",
    "Mourvedre": "red",
    "Merlot": "red",
    "Syrah": "red",
    "Zinfandel": "red",
  };

  bottleType = () => {
    if (this.props.bottle) {
      return this.bottleColors[this.props.bottle.wine.wineType];
    } else {
      return "empty";
    }
  };

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default Cell;
