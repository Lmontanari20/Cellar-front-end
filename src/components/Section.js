import React, { Component, Fragment } from "react";
import Cell from "./Cell";

class Section extends Component {
  state = {};

  componentDidMount() {
    // console.log(this.props);
  }

  // h: 1 => 24px
  // h: 2 => 70px  -24= 46
  // h: 3 => 110px -24= 86
  // h: 4 => 150px -24= 126
  // h: 5 => 190px -24=

  // w: 1 => 89px
  // w: 2 => 188px (+99)
  // w: 3 => 288px (+100)
  // w: 4 => 387px (+99)
  // w: 4.5 => 436px
  // w: 5 => 486px (+99)
  // w: 6 => 585 (+99)
  // w: 7 => 684 (+99)

  // can we set height+width of cell as a ratio of the size of the section?

  findBottle = (x, y) => {
    if (this.props.bottles) {
      return this.props.bottles.find(
        (bottle) => bottle.x === x && bottle.y === y
      );
    }
  };

  renderCells = (y) => {
    let arr = [];
    for (let index = 0; index < this.props.width; index++) {
      arr.push(index);
    }
    let cellKey = "";
    let x = 0;

    return arr.map((i) => {
      x = i + 1;
      cellKey = `${this.props.sectionName}-${x}x-${y}y`;
      let foundBottle = this.findBottle(x, y);
      return <Cell key={cellKey} bottle={foundBottle} />;
    });
  };

  renderRows = () => {
    let arr = [];
    for (let index = 0; index < this.props.height; index++) {
      arr.push(index);
    }
    let rowNum = 0;
    return arr.map((i) => {
      rowNum = this.props.height - i;
      return <div className="bottle-row">{this.renderCells(rowNum)}</div>;
    });
  };

  render() {
    return (
      <Fragment>
        <div className="section-head">{this.props.sectionName}</div>
        {/* <div className="bottle-row">{this.renderCells()}</div> */}
        {this.renderRows()}
      </Fragment>
    );
  }
}

export default Section;
