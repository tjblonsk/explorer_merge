class CityTable < ActiveRecord::Migration
  def up
    create_table :cities do |t|
     t.string :name
     t.float :latitude
     t.float :longitude
     t.references :user
     t.references :spot
     t.boolean :favorite, default: false
     t.timestamps
  end
end

  def down
    drop_table :cities
  end
end
