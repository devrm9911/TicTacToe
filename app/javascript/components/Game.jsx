import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Board from "./Board";
import MessageBar from "./MessageBar";

const Game = (props) => {
  const [gameState, setGameState] = useState({
    gameover: null,
    player1: null,
    player2: null,
    activePlayer: null,
    board: null,
    message: null,
  });

  const newGame = () => {
    $.get("/new", (response) => {
      setGameState({ ...response });
    });
  };

  const placeMarker = (key) => {
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
          setGameState({ ...data });
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
      <div className="game">
        <h1 className="title">Tic Tac Toe</h1>
        <div onClick={() => newGame()}>Start New Game</div>
        <Board boardState={gameState.board} placeMarker={placeMarker} />
        <MessageBar message={gameState.message} />
        <ResetButton />
      </div>
    </>
  );
};

export default Game;
