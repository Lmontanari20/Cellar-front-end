import React, { Component, Fragment } from "react";

class Cell extends Component {
  state = {};

  bottleType = () => {
    if (this.props.bottle) {
      return this.props.bottle.type;
    } else {
      return "empty";
    }
  };

  render() {
    return (
      <Fragment>
        <div className="bottle-cell">
          <img
            src={process.env.PUBLIC_URL + `/bottle-${this.bottleType()}.png`}
            alt={`${this.bottleType()} wine`}
          />
        </div>
      </Fragment>
    );
  }
}

export default Cell;
