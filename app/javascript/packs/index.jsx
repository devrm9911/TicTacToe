import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Join from "../components/Join";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Join />,
    document.body.appendChild(document.createElement("div"))
  );
});
