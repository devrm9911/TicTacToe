import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Board from "./Board";
import MessageBar from "./MessageBar";
import { ActionCable } from "react-actioncable-provider";

const Game = ({ gameState, setGameState }) => {
  const [showAlert, setShowAlert] = useState(false);
  const placeMarker = (key) => {
    if (
      (localStorage.getItem("player1") &&
        gameState.activePlayer === "player1") ||
      (localStorage.getItem("player2") && gameState.activePlayer === "player2")
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
      setShowAlert(true);
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
        <div>
          Please tell opponent to enter <h1>Game Id: {gameState.id}</h1>
        </div>
      )}
      <Alert
        show={showAlert}
        variant={"danger"}
        onClose={() => setShowAlert(false)}
        dismissible
      >
        Please wait for your turn
      </Alert>
      <div className="game">
        <Board boardState={gameState.board} placeMarker={placeMarker} />
        <MessageBar message={gameState.message} />
        <ResetButton />
      </div>
    </>
  );
};

export default Game;
