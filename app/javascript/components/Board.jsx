import React from "react";
import Cell from "./Cell";

const BoardGrid = (props) => {
  return (
    <>
      {props.boardState?.map((cell, index) => {
        return (
          <Cell
            marker={cell}
            placeMarker={props.placeMarker}
            id={index}
            key={index}
          />
        );
      })}
    </>
  );
};

const Board = (props) => (
  <div className="board">
    <BoardGrid boardState={props.boardState} placeMarker={props.placeMarker} />
  </div>
);

export default Board;
