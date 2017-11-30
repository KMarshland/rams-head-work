class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def requires_admin
    redirect_to(root_path) unless current_user && current_user.is_admin?
  end

end
