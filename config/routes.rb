Rails.application.routes.draw do
  root "game#index"
  get '/new', to: 'game#new'
  get '/move', to: 'game#move'
end
