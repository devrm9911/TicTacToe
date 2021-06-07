class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :player1
      t.string :player2
      t.string :active

      t.timestamps null: false
    end
  end
end
