class ApplicationController < ActionController::Base

  # protect_from_forgery with: :exception
  before_action :authenticate_request
  attr_reader :current_user

  include ExceptionHandler

  # [...]
  private
  def authenticate_request
    Rails.logger.debug "authenticate request"
    @current_user = AuthorizeApiRequest.call(request.headers).result
    Rails.logger.debug "current user: #{current_user.inspect}"
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

end
