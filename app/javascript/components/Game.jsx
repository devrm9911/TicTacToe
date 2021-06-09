import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Board from "./Board";
import MessageBar from "./MessageBar";
import { ActionCable } from "react-actioncable-provider";

const Game = ({ gameState, setGameState }) => {
  const placeMarker = (key) => {
    if (
      true
      // (localStorage.getItem("player1") &&
      //   gameState.activePlayer === "player1") ||
      // (localStorage.getItem("player2") && gameState.activePlayer === "player2")
    ) {
      let board = gameState.board;
      const invalid = board[key];
      if (invalid) {
        return;
      }

      board[key] =
        gameState.activePlayer === "player1"
          ? gameState.player1
          : gameState.player2;

      setGameState({ ...gameState, board: board });
      updateMove();
    } else {
      console.log("Please wait for your turn");
    }
  };

  const updateMove = () => {
    $.get(
      "/move",
      {
        id: gameState.id,
        board: gameState.board,
        activePlayer: gameState.activePlayer,
      },
      (data, status) => {
        if (status === "success") {
        }
      }
    );
  };

  const ResetButton = () => {
    return (
      <>
        {gameState.gameover && (
          <div className="reset" onClick={() => newGame()}>
            Again!
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <ActionCable
        channel={{ channel: "GameChannel" }}
        onReceived={(response) => {
          setGameState(response?.message);
        }}
      />
      {gameState?.player1 && !gameState?.player2 && (
        <div>Please tell opponent to enter Game Id: {gameState.id}</div>
      )}
      <div className="game">
        <Board boardState={gameState.board} placeMarker={placeMarker} />
        <MessageBar message={gameState.message} />
        <ResetButton />
      </div>
    </>
  );
};

export default Game;
