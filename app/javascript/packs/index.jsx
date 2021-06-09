import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Join from "../components/Join";
import { ActionCableProvider } from "react-actioncable-provider";
import ActionCable from "actioncable";

const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

export const API_ROOT = "http://localhost:3000";
export const API_WS_ROOT = "ws://localhost:3000/cable";
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ActionCableProvider cable={cable}>
      <Join />{" "}
    </ActionCableProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
