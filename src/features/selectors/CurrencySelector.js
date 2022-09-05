import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
Modal.setAppElement("#root");

class CurrencySelector extends Component {
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
        className="selector_modal"
        overlayClassName="selector_modal_overlay"
      >
        <div className="currencySelector__list">
          {this.props.currencies.map((cur, index) => {
            return (
              <CurItem
                onClick={() => this.handleCurrencyChange(cur)}
                key={index}
              >
                <span className="CurrencySelector__symbol">{cur.symbol}</span>
                {cur.label}
              </CurItem>
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
)(CurrencySelector);
