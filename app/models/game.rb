class Game < ApplicationRecord
  attr_accessor :board

  before_create :randomize_markers, :randomize_starting_player

  def self.setup
    game = self.create(board: Board.new)
    return game
  end

  private

  def randomize_markers
    self.player1, self.player2 = ["x", "o"].shuffle
  end

  def randomize_starting_player
    self.active = [self.player1, self.player2].sample
  end
end
