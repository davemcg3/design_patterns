Rails.application.routes.draw do
  resources :statuses
  resources :sites
  resources :notes

  # jwt auth
  post 'auth/register', to: 'users#register'
  post 'auth/login', to: 'users#login'
  get 'test', to: 'users#test'

  get 'home/index'
  get 'home/timestamp'

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
