import React from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export const withHooksHOC = (Component) => {
  return (props) => {
    const location = useLocation();
    return <Component location={location} {...props} />;
  };
};

export const selectorHOC = (Component) => {
  return (props) => {
    const selector = useSelector();
    return <Component selector={selector} {...props} />;
  };
};

export const dispatchHOC = (Component) => {
  return (props) => {
    const dispatch = useDispatch();
    return <Component dispatch={dispatch} {...props} />;
  };
};
