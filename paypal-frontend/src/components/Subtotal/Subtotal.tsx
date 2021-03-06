import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import ItemDetails from "../ItemDetails/ItemDetails";
import PayButton from "../PayButton/PayButton";

const axios = require("axios").default;
const qs = require("querystring");

interface SubtotalProps {}

interface SubtotalState {
  items: Item[];
  subtotal: number;
}

interface Item {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  sku: string;
}

// Temporary test items. To be passed as props from parent component or fetched from backend

let sampleItem = {
  sku: "123",
  price: 15.99,
  name: "AmazonBasics AA 1.5 Volt Performance Alkaline Batteries - Pack of 48",
  description:
    "One 48-pack AA 1.5-volt performance alkaline batteries for reliable performance across a wide range of devices",
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/I/71UyNLSv2mL._AC_SL1348_.jpg",
  quantity: 1,
};

let sampleItem2 = {
  sku: "456",
  price: 7.99,
  name:
    "AmazonBasics Nylon Braided Lightning to USB A Cable, MFi Certified iPhone Charger, Dark Gray, 6-Foot",
  description:
    "Apple MFi certified charging and syncing cable for your Apple devices",
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/I/71p11135VSL._AC_SL1500_.jpg",
  quantity: 1,
};

// End temporary test items

const initialState = {
  items: [sampleItem, sampleItem2],
  subtotal: 23.98,
};

export default class Subtotal extends Component<SubtotalProps> {
  readonly state: SubtotalState = initialState;

  updateQuantity = (quantity: number, sku: string) => {
    let index = this.state.items.findIndex((x) => x.sku === sku);
    let items: any = this.state.items; // TODO: fix this type
    items[index]["quantity"] = quantity;
    let subtotal = items.reduce(
      (sum: number, item: Item) => sum + item.price * item.quantity,
      0
    );
    this.setState({ items, subtotal });
  };

  renderItems = (state: SubtotalState) => {
    console.log(this.state);
    return (
      <div>
        {this.state.items.map((item: Item) => (
          <ItemDetails
            key={item.sku}
            sku={item.sku}
            price={item.price}
            name={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            quantity={item.quantity}
            onUpdateQuantity={this.updateQuantity}
          ></ItemDetails>
        ))}
        <br></br>
        <Row className="show-grid">
          <Col md={6}>
            <h4>
              <strong>Total:</strong>
            </h4>
          </Col>
          <Col md={6}>{`$${this.state.subtotal}`}</Col>
        </Row>
        <br></br>
        <br></br>
        <PayButton amount={this.state.subtotal}></PayButton>
      </div>
    );
  };
  render() {
    return this.renderItems(this.state);
  }
}
