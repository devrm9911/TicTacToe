import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Game from "./Game";

const Join = (props) => {
  const [view, setView] = useState();
  const [gameState, setGameState] = useState({
    id: null,
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
    setView("newGame");
  };

  const ControllerMenu = () => (
    <>
      <Button onClick={() => newGame()}>New Game</Button>
      <Button onClick={() => setView("showForm")}>Join Game</Button>
    </>
  );

  const GameLoginForm = () => {
    const [gameId, setGameId] = useState();
    const joinGame = () => {
      $.get(
        "/join",
        {
          id: gameId,
        },
        (data, status) => {
          if (status === "success") {
            console.log(data);
            setGameState({ ...data });
            setView("newGame");
          }
        }
      );
    };

    return (
      <>
        <Form>
          <Form.Group controlId="gameId">
            <Form.Label>Game ID</Form.Label>
            <Form.Control
              value={gameId}
              onChange={(event) => setGameId(event.target.value)}
              placeholder="Enter Game ID"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              joinGame();
            }}
          >
            Submit
          </Button>
        </Form>
      </>
    );
  };

  const showPage = (view) => {
    if (view === "newGame") {
      return <Game gameState={gameState} setGameState={setGameState} />;
    } else if (view === "showForm") {
      return <GameLoginForm />;
    } else {
      return <ControllerMenu />;
    }
  };

  return showPage(view);
};

export default Join;