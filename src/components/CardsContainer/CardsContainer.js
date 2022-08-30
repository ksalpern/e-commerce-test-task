import React, { Component } from "react";
import Card from "../Card/Card";

export default class CardsContainer extends Component {
  render() {
    return (
      <div className="cardsContainer">
        <h2 className="cardsContainer__header">{this.props.title}</h2>
        <section className="card__container">
          <Card />
        </section>
      </div>
    );
  }
}
