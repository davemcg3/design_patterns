class CreateOffer < ActiveRecord::Migration[5.1]
  def change
    create_table :offers do |t|
      t.decimal :payout_percentage
      t.text :html_content
    end
  end
end
