import React, { Component } from "react";
import Tech from "../../../features/Tech";

export default class TechContainer extends Component {
  render() {
    return (
      <div className="techContainer">
        <h2 className="techContainer__header">Tech</h2>
        <section className="techContainer__cards">
          <Tech />
        </section>
      </div>
    );
  }
}
