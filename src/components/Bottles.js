import { Container } from "react-bootstrap";
import { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import WineSizes from "./../WineSizes";

export default class Bottles extends Component {
  state = {
    bottles: [],
  };

  componentDidMount() {
    this.fetchBottles(this.props.userId);
  }

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
            return WineSizes[b] - WineSizes[a];
          } else {
            return WineSizes[a] - WineSizes[b];
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
