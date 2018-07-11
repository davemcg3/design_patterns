class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.json :data
      t.integer :site
      t.integer :user
      t.integer :status

      t.timestamps
    end
  end
end
