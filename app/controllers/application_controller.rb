class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def requires_admin
    redirect_to(root_path) unless current_user && current_user.is_admin?
  end


  protected

  def configure_permitted_parameters

    devise_parameter_sanitizer.permit(:account_update) do |user_params|
      params = user_params.permit(:name, :role, :email, :password, :password_confirmation, :current_password)
      params[:skills] = []
      User.skills.each do |skill|
        params[:skills] << skill if user_params[:"skill_#{skill.gsub(' ', '_')}"]
      end

      params
    end

    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role])
  end

end
