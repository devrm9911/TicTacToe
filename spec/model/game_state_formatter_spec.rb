require 'rails_helper'

RSpec.describe GameStateFormatter, :type => :model do
  let(:game) { Game.setup }
  it "is valid" do
    expect(GameStateFormatter.format(game)).to(be_truthy)
  end
end
