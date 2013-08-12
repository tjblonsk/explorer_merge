class SpotTable < ActiveRecord::Migration
  def up
    create_table :spots do |t|
     t.string :name
     t.string :address
     t.string :phone
     t.string :website
     t.float :latitude
     t.float :longitude
     t.references :user
     t.references :city
     t.timestamps
    end

  end

  def down
    drop_table :spots
  end
end
