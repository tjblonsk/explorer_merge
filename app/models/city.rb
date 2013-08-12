class City < ActiveRecord::Base
  attr_accessible :name, :latitude, :longitude
  belongs_to :user
  has_many :spots
end