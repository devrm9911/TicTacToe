class Game < ApplicationRecord

  belongs_to :board

  def self.setup
    board = Board.build
    game = self.create(board_id: board.id, player1: "x", active: "player1")
    return game
  end
end
