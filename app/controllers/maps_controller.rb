class MapsController < ApplicationController

  def index
  end
  def about
  end

  def save
    @spotFave = Spot.create(
      name: params[:name],
      address: params[:address],
      latitude: params[:latitude],
      longitude: params[:longitude],
      phone: params[:phone],
      website: params[:website]
      )
     city_name = params[:city]
     state = params[:state]
     city_to_search = city_name + ', ' + state
     @city = City.where(name: city_to_search)
     @city.first.spots << @spotFave
     @city.first.favorite = true
     current_user.cities << @city
     current_user.spots << @spotFave

    respond_to do |format|
      format.json {render json: @spotFave}
    end
  end


  def favorite
     @spots = current_user.spots
      respond_to do |format|
      format.html
      format.json {render json: @spots}
    end
  end


  def show_cities
    @cities = City.all
      respond_to do |format|
      format.html
      format.json {render json: @cities}
    end
  end



  def send_yelp
    @searchSpot = Spot.create(
      name: params[:name],
      latitude: params[:latitude],
      longitude: params[:longitude]
    )
    client = Yelp::Client.new
    request = GeoPoint.new(
           :term => @searchSpot.name,
           :latitude => @searchSpot.latitude,
           :longitude => @searchSpot.longitude,
           limit: 1,
           consumer_key: 'mcTXlE828xeks7ESsscUSA',
           consumer_secret: 'xU1QsQowBpjeyoQWPFVzU3jIXPk',
           token: 'OhsIeHQUElHFM8Dazjn2q9k_eDEpo0oF',
           token_secret: 'bAwOoJMhBUaPNYEcznrNYtwI4Io')

    @response = client.search(request)

    respond_to do |format|
      format.json {render json: @response}
    end
  end


  def show_favorite_cities
    @favorite_cities = current_user.cities
    respond_to do |format|
      # format.js {}
      format.json {render json: @favorite_cities}
    end
  end


def show_spots_by_city
  @favecity = City.where(name: params[:name])
  @favecityspots = @favecity.first.spots
  respond_to do |format|
    # format.js {}
    format.json {render json: @favecityspots}
  end
end


def show_spot_details
  @spot_details = Spot.find(params[:id])
  respond_to do |format|
    # format.js {}
    format.json {render json: @spot_details}
  end
end


def destroy
  @spot_to_delete = Spot.find(params[:id])
  @spot_to_delete.delete
    respond_to do |format|
    # format.js {}
    format.json {render json: @spot_to_delete}
  end
end


end