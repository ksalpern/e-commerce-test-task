import React, { Component } from "react";
import Modal from "react-modal";

import Minicart from "../../components/Minicart/Minicart";
Modal.setAppElement("#root");

export default class MinicartModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.toggleModalMinicart}
        contentLabel="My dialog"
        className="busket__modal"
        overlayClassName="busket__modal-overlay"
      >
        <Minicart toggleModalMinicart={this.props.toggleModalMinicart} />
      </Modal>
    );
  }
}
