import React, { Component } from "react";
import mainLogo from "../../assets/greenCart.svg"
import styled from "styled-components";

export default class MainLogo extends Component {
  render() {
    return (
      <>
        <HeaderLogo>
          <img src={mainLogo} alt="main logo"></img>
        </HeaderLogo>
      </>
    );
  }
}

const HeaderLogo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 31px;
  width: 31px;
  z-index: 1;
`;