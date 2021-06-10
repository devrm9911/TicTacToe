require 'rails_helper'

RSpec.describe Board, :type => :model do
  it "is valid" do
    expect(Board.new).to be_valid
  end
  it "build creates a valid board object" do
    expect(Board.build).to be_valid
  end
  context "has all cells full" do
    let(:board) { Board.create(cells: ['o','o','x','x','x','x','x','x','o']) }
    it "returns true" do
      expect(board.full?).to(be_truthy)
    end
  end
  context "has all cells clean" do
    let(:board) { Board.create(cells: []) }
    it "returns true" do
      expect(board.is_clean?).to(be_truthy)
    end
  end
  context "has all cells are occupied with gameover situation" do
    let(:board) { Board.create(cells: ['o','o','x','x','o','x','x','x','x']) }
    it "returns true" do
      expect(board.gameover?).to(be_truthy)
    end
  end
  context "has all cells are occupied with winner situation" do
    let(:board) { Board.create(cells: ['o','o','o','x','x']) }
    it "returns true" do
      expect(board.winner).to(be_truthy)
    end
  end
end
