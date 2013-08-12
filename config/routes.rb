Explorer::Application.routes.draw do
  devise_for :users
  root to: 'maps#index', as: 'explorer_home'
  get '/yelp' => "maps#yelp"

  post '/save', to: 'maps#save'

  get '/favorite', to: 'maps#favorite'

  get '/show/cities', to: 'maps#show_cities'

  post '/send', to: 'maps#send_yelp'

  get '/show/favorite_cities', to: 'maps#show_favorite_cities'

  get '/show/favorite_cities/:name', to: 'maps#show_spots_by_city'

  get '/show/spot_details/:id', to: 'maps#show_spot_details'

  delete '/delete/:id', to: 'maps#destroy'

  get '/about', to: 'maps#about'

end
