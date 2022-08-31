import React, { Component } from "react";
import All from "../../../features/All";
import "./AllContainer.css";

export default class AllContainer extends Component {
  render() {
    return (
      <div className="allContainer">
        <h2 className="allContainer__header">All</h2>
        <section className="allContainer__cards">
          <All />
        </section>
      </div>
    );
  }
}
