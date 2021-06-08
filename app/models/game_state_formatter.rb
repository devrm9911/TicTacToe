class GameStateFormatter
  def self.format(game)
    if game.board.nil? && game.player2.nil?
      message = "Please ask opponent to Join"
    elsif game.board.nil? || game.board&.is_clean?
      message = "Welcome to Tic-Tac-Toe. #{game.active.upcase} starts first."
    elsif game.board&.is_tie?
      message = "It's a tie! Play again?"
    elsif game.board&.winner
      message = "#{game.board.winner.upcase} won! Play again?"
    else
      message = "#{game.active.upcase} It's Your turn."
    end

    activePlayer = game.active === game.player1 ? 'player1' : 'player2'

    return {
      id: game.id,
      gameover: game.board&.gameover?,
      player1: game.player1,
      player2: game.player2,
      activePlayer: activePlayer,
      board: game.board&.cells,
      message: message
    }
  end
end
