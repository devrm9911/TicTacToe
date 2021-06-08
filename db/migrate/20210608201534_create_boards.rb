class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.text :cells, array: true, default: []
    end
  end
end
