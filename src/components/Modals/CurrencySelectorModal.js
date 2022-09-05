import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import styled from "styled-components";
import "../../App.css";

Modal.setAppElement("#root");

class CurrencySelectorModal extends Component {
  constructor(props) {
    super(props);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleCurrencyChange(cur) {
    this.props.saveCurrencyToStore({
      label: cur.label,
      symbol: cur.symbol,
    });
    this.props.toggleModalSelector();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.toggleModalSelector}
        contentLabel="My dialog"
        className="selector__modal"
        overlayClassName="selector__modal-overlay"
      >
        <div className="selector__list">
          {this.props.currencies.map((cur, index) => {
            return (
              <CurrencyItem
                onClick={() => this.handleCurrencyChange(cur)}
                key={index}
              >
                <span className="currencySymbol">{cur.symbol}</span>
                {cur.label}
              </CurrencyItem>
            );
          })}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrencyToStore: (cur) =>
      dispatch({ type: "currencies/setCurrency", payload: cur }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelectorModal);

const CurrencyItem = styled.div`
  cursor: pointer;
  font-family: "Raleway";
  color: #1d1f22;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  margin-bottom: 20px;
  &: hover {
    text-decoration: underline;
    font-weight: 700;
  }
`;
