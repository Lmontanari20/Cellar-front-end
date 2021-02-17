import { Container } from "react-bootstrap";
import { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default class Bottles extends Component {
  state = {
    bottles: [],
  };

  componentDidMount() {
    this.fetchBottles(this.props.userId);
  }
  // retrieve user.bottles to use as bottleData
  // also have column for section + coords

  // const bottleData = [
  //   {
  //     id: 1,
  //     name: "aWine Name1",
  //     winery: "yWinery1",
  //     type: "Cab",
  //     year: 1999,
  //     size: "Magnum (1.5 L)",
  //     price: 20,
  //   },
  //   {
  //     id: 2,
  //     name: "bWine Name2",
  //     winery: "xWinery2",
  //     type: "Merlot",
  //     year: 2000,
  //     size: "Double Magnum (3 L)",
  //     price: 21,
  //   },
  //   {
  //     id: 3,
  //     name: "cWine Name3",
  //     winery: "zWinery3",
  //     type: "Sauv Blanc",
  //     year: 2018,
  //     size: "Standard (750ml)",
  //     price: 22,
  //   },
  //   {
  //     id: 4,
  //     name: "dWine Name4",
  //     winery: "zzWinery3",
  //     type: "Red Blend",
  //     year: 2015,
  //     size: "Nebuchadnezzar (15 L)",
  //     price: 2000,
  //   },
  //   {
  //     id: 5,
  //     name: "eWine Name5",
  //     winery: "zzWinery5",
  //     type: "Chardonnay",
  //     year: 2019,
  //     size: "Split/Piccolo (187.5ml)",
  //     price: 2,
  //   },
  // ];

  // custom sort on size
  // create object to map sizes to rank order values
  //
  fetchBottles = (id) => {
    if (!id) {
      return null;
    }
    let bottlesArray = [];
    fetch(`http://localhost:3000/bottles/${id}`)
      .then((res) => res.json())
      .then((bottles) => {
        bottlesArray = bottles.map((bottle) => {
          return {
            id: bottle.id,
            name: bottle.wine.name,
            winery: bottle.wine.winery,
            type: bottle.wine.wineType,
            year: bottle.wine.year,
            size: bottle.size,
            price: bottle.price,
          };
        });
        this.setState({ bottles: bottlesArray });
      });
  };

  render() {
    const sizeObj = {
      "Standard (750ml)": 4,
      "Split/Piccolo (187.5ml)": 1,
      "Half/Demi (375 ml)": 2,
      "Half-liter/Jennie (500ml)": 3,
      "Liter (1000ml)": 5,
      "Magnum (1.5 L)": 6,
      "Double Magnum (3 L)": 7,
      "Rehoboam (Jeroboam in Bordeaux) (4.5 L)": 8,
      "Methuselah or Imperial (Bordeaux) (6 L)": 9,
      "Salmanazar (9 L)": 10,
      "Balthazar (12 L)": 11,
      "Nebuchadnezzar (15 L)": 12,
      "Melchior (18 L)": 13,
      "Solomon (20 L)": 14,
      "Sovereign (26 L)": 15,
      "Primat/Goliath (27 L)": 16,
      "Melchizedek/Midas (30 L)": 17,
    };

    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "winery",
        text: "Winery",
        sort: true,
      },
      {
        dataField: "type",
        text: "Type",
        sort: true,
      },
      {
        dataField: "year",
        text: "Year",
        sort: true,
      },
      {
        dataField: "size",
        text: "Size",
        sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
          if (order === "asc") {
            return sizeObj[b] - sizeObj[a];
          } else {
            return sizeObj[a] - sizeObj[b];
          }
        },
      },
      {
        dataField: "price",
        text: "Price",
        sort: true,
      },
    ];

    return (
      <Container>
        <BootstrapTable
          keyField="id"
          data={this.state.bottles}
          columns={columns}
          bootstrap4={true}
        />
      </Container>
    );
  }
}
