class Spot < ActiveRecord::Base
attr_accessible :name, :address, :latitude, :longitude, :phone, :website
belongs_to :users
belongs_to :cities
end