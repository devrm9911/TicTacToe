require 'rails_helper'

RSpec.describe Game, :type => :model do
  let(:board) { Board.create }
  it "is valid" do
    expect(Game.new(board_id: board.id)).to be_valid
  end
  it "is not valid without a Board" do
    expect(Game.new).to_not be_valid
  end
  it "is valid on executing setup method" do
    expect(Game.setup).to be_valid
  end
end
