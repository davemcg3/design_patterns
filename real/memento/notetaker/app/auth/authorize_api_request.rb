# app/commands/authorize_api_request.rb

class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    Rails.logger.debug "call"
    user
  end

  private

  attr_reader :headers

  def user
    Rails.logger.debug "user"
    # Rails.logger.debug decoded_auth_token
    begin
      @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    rescue ExceptionHandler::ExpiredSignature => e
      # expired token, @user should be nil
      Rails.logger.debug "rescuing expired signature"
      Rails.logger.debug e.message
    end
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    Rails.logger.debug "decoded auth token"
    # Rails.logger.debug JsonWebToken.decode(http_auth_header)
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    Rails.logger.debug "http auth header"
    Rails.logger.debug headers['Authorization']
    if headers['Authorization'].present?
      Rails.logger.debug "returning #{headers['Authorization'].split(' ').last}"
      return headers['Authorization'].split(' ').last
    else errors.add(:token, 'Missing token')
    end
    Rails.logger.debug "returning nil"
    nil
  end
end
