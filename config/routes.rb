Rails.application.routes.draw do

  resources :set_tasks do
    resources :build_tasks do
      post 'claim'
      post 'relinquish'
      post 'mark_complete'
    end
  end

  devise_for :users
  get 'profile' => 'home#profile'
  patch 'profile' => 'home#update_profile', as: :update_profile

  root 'home#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
