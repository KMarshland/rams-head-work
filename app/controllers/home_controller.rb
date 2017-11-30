class HomeController < ApplicationController
  def home
    @set_tasks = SetTask.all
  end
end
