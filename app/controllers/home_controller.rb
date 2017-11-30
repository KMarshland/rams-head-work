class HomeController < ApplicationController

  before_action :authenticate_user!, only: [:profile, :update_profile]

  def home
    @set_tasks = SetTask.all
  end

  def profile

  end

end
