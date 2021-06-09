Rails.application.routes.draw do
  root "game#index"
  get '/new', to: 'game#new'
  get '/move', to: 'game#move'
  get '/join', to: 'game#join'
  mount ActionCable.server => '/cable'
end
