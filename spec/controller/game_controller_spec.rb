require "rails_helper"

RSpec.describe GameController, :type => :controller do
  describe "GET new" do
    it "has a 200 status code" do
      get :new
      expect(response.status).to eq(200)
    end
    it "should increase Game count" do
      get :new
      expect(Game.count).to eq(1)
    end
  end
  describe "GET join" do
    let(:game) { Game.setup }
    it "has a 200 status code" do
      get :join, params: { id: game.id}
      expect(response.status).to eq(200)
    end
    it "should assign player2" do
      get :join, params: { id: game.id}
      expect(Game.find(game.id).player2).to_not be_nil
    end
  end
  describe "GET move" do
    let(:game) { Game.setup }
    it "has a 200 status code" do
      get :move, params: { :id => game.id, :board => ['o']}
      expect(response.status).to eq(200)
    end
  end
end
