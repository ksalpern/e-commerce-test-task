import React, { Component } from "react";
import styled from "styled-components";
import busket from "../../assets/cartWhite.svg";
import "../../App.css";

export default class BusketLogoCart extends Component {
  render() {
    return (
      <>
        <BusketLogo>
          <img src={busket} alt="busket logo"></img>
        </BusketLogo>
      </>
    );
  }
}

const BusketLogo = styled.div`
  position: absolute;
  left: 40%;
  top: 40%;
  transform: translate(-50%, -50%);
  height: 13px;
  width: 20px;
  z-index: 1;
`;
