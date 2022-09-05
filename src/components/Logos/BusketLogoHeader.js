import React, { Component } from "react";
import styled from "styled-components";
import busketLogo from "../../assets/cart.svg";
import "../../App.css";

export default class BusketLogoHeader extends Component {
  render() {
    return (
      <>
        <BusketLogo>
          <img src={busketLogo} alt="busket logo"></img>
        </BusketLogo>
      </>
    );
  }
}
const BusketLogo = styled.div`
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -60%);
  height: 13px;
  width: 20px;
  z-index: 1;
`;
