class GameController < ApplicationController
  def index
  end

  def new
    game = Game.setup
    ActionCable.server.broadcast "game_channel", message: GameStateFormatter.format(game)
    head :ok
    # render json: GameStateFormatter.format(game)
  end

  def move
    game = Game.find(params[:id])
    game.board = Board.new(cells: board_params)
    # TOGGLE USER
    game.active = params[:activePlayer] === 'player1' ? game.player2 : game.player1
    ActionCable.server.broadcast "game_channel", message: GameStateFormatter.format(game)
    head :ok
  end

  def join
    game = Game.find(params[:id])
    game.update(player2: "o")
    ActionCable.server.broadcast "game_channel", message: GameStateFormatter.format(game)
    head :ok
  end

  private

  def board_params
    params[:board].map { |c| c.empty? ? nil : c }
  end
end
