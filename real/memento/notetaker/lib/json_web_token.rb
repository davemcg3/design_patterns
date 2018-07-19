# lib/json_web_token.rb
class JsonWebToken
# our secret key to encode our jwt

  class << self
    def encode(payload, exp = 2.hours.from_now)
      # set token expiration time
      payload[:exp] = exp.to_i

      # this encodes the user data(payload) with our secret key
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    def decode(token)
      Rails.logger.debug "decoding json web token #{token}"
      #decodes the token to get user data (payload)
      body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
      Rails.logger.debug body
      HashWithIndifferentAccess.new body

        # raise custom error to be handled by custom handler
    rescue JWT::ExpiredSignature, JWT::VerificationError => e
      Rails.logger.debug "Expired Signature"
      raise ExceptionHandler::ExpiredSignature, e.message
    rescue JWT::DecodeError, JWT::VerificationError => e
      Rails.logger.debug "Decode Error"
      raise ExceptionHandler::DecodeError, e.message
    end
  end
end
