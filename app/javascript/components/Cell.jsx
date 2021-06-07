import React from "react";

const Cell = (props) => (
  <div
    onClick={() => props.placeMarker(props.id)}
    className={`cell ${props.marker}`}
  ></div>
);

export default Cell;
