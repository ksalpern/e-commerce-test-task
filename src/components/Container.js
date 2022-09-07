import React, { Component } from "react";
import Header from "./Header";
import '../App.css'
class Container extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Header />
        <main id="main">{this.props.children}</main>
      </div>
    );
  }
}

export default Container;
