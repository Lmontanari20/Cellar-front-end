import React, { Component, Fragment } from "react";

class Section extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props);
  }

  // h: 1 => 24px
  // h: 2 => 70px
  // h: 3 => 110px
  // h: 4 => 150px
  // h: 5 => 190px

  // w: 1 => 89px
  // w: 2 => 188px (+99)
  // w: 3 => 288px (+100)
  // w: 4 => 387px (+99)
  // w: 4.5 => 436px
  // w: 5 => 486px (+99)
  // w: 6 => 585 (+99)
  // w: 7 => 684 (+99)

  // can we set height+width of cell as a ratio of the size of the section?

  render() {
    return (
      <Fragment>
        <div>{this.props.sectionName}</div>
      </Fragment>
    );
  }
}

export default Section;
