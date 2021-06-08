class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_channel"
  end

  def speak(data)
    ActionCable.server.broadcast "game_channel", message: data["message"]
  end

  def start_new_game
    game = Game.setup
    ActionCable.server.broadcast "game_channel", message: GameStateFormatter.format(game)
  end

  def move
    game = Game.find(params[:id])
    game.board.update(cells: board_params)
    # TOGGLE USER
    game.active = params[:activePlayer] === 'player1' ? game.player2 : game.player1

    render json: GameStateFormatter.format(game)
    ActionCable.server.broadcast "game_channel", message: GameStateFormatter.format(game)
  end
end
