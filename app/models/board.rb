class Board < ApplicationRecord
  has_many :games

  def self.build
    board = Board.create!
    board.update(cells: Array.new(9))
    board
  end

  def rows
    [
      [cells[0],cells[1],cells[2]],
      [cells[3],cells[4],cells[5]],
      [cells[6],cells[7],cells[8]]
    ]
  end

  def columns
    [
      [cells[0],cells[3],cells[6]],
      [cells[1],cells[4],cells[7]],
      [cells[2],cells[5],cells[8]]
    ]
  end

  def diagonals
    [
      [cells[0],cells[4],cells[8]],
      [cells[6],cells[4],cells[2]]
    ]
  end

  def full?
    cells.all? {|i| !i.nil? }
  end

  def is_clean?
    cells.all? &:nil?
  end

  def is_tie?
    winner.nil? && full?
  end

  def gameover?
    !winner.nil? || is_tie?
  end

  def winner
    winner = nil
    rows.each do |row|
      if row.uniq.length == 1 && row.uniq.all?(&:nil?) == false
        winner = row.first
      end
    end

    columns.each do |column|
      if column.uniq.length == 1 && column.uniq.all?(&:nil?) == false
        winner = column.first
      end
    end

    diagonals.each do |diagonal|
      if diagonal.uniq.length == 1 && diagonal.uniq.all?(&:nil?) == false
        winner = diagonal.first
      end
    end

    return winner
  end
end
