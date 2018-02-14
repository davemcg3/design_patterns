class CreateSale < ActiveRecord::Migration[5.1]
  def change
    create_table :sales do |t|
      t.references :offer, foreign_key: true
      t.decimal :amount
      t.references :advertiser, foreign_key: true
      t.decimal :advertiser_payout
    end
  end
end
