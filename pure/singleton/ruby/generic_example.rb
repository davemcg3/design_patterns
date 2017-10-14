require "singleton"

class SingletonLibrary
  include Singleton

  def instance
    return self
  end

  def singletonOperation data
    @singletonData = data
  end

  # don't need a getter here because attr_accessor, but for pattern completeness
  def getSingletonData
    @singletonData
  end
end

class SingletonSimple
  private_class_method :new

  def singletonOperation data
    @singletonData = data
  end

  # don't need a getter here because attr_accessor, but for pattern completeness
  def getSingletonData
    @singletonData
  end

  private
  def initialize
  end

  # class methods
  class << self
    def instance
      @justOne = @justOne || new
    end
  end
end

class SingletonClassMethodsOnly
  class << self
    undef_method :new

    def singletonOperation data
      @singletonData = data
    end

    def getSingletonData
      @singletonData
    end

    def instance
      self
    end
  end
end

def run implementations
  implementations.each do |implementation|
    p "Implementation #{implementation.name}"
    p failed = implementation.new rescue "Can't instantiate Singleton with .new"
    first = implementation.instance
    second = implementation.instance
    p " first object: #{first.inspect}"
    p "second object: #{second.inspect}" #manual check for same object
    p "same object? #{first == second}" #not instantiated in SingletonClassMethodsOnly
    first.singletonOperation "set data in first"
    p " first object get data: #{first.getSingletonData}"
    p "second object get data: #{second.getSingletonData}" #should show "set data in first"
    sent = implementation.send(:new) rescue implementation
    p "could we instantiate with send(:new)? #{sent.instance_of? implementation}: #{sent}"
    p "is send method weakness of #{implementation.name}? #{!(sent == first)}" # need == instead of === for SingletonClassMethodsOnly
    print "\n"
  end
end

run [SingletonLibrary, SingletonSimple, SingletonClassMethodsOnly]
