class GameController < ApplicationController
  def index
  end

  def new
    game = Game.setup
    render json: GameStateFormatter.format(game)
  end

  def move
    game = Game.find(params[:id])
    game.board = Board.new(cells: board_params)
    # TOGGLE USER
    game.active = params[:activePlayer] === 'player1' ? game.player2 : game.player1

    render json: GameStateFormatter.format(game)
  end

  private

  def board_params
    params[:board].map { |c| c.empty? ? nil : c }
  end
end
