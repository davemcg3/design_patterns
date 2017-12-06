require './decorator'

 class Authorable
   include Decorator
   attr_accessor :author

   def authorable author
     @author = author
   end

 end

class Editable
  include Decorator

  def editPost message
    @component.message = message
  end
end

class Publishable
  include Decorator

  def publish
    @published = Time.now
  end

  def unpublish
    @published = false
  end

  def published?
    @published ? true : false
  end

  def published_at
    @published
  end
end
