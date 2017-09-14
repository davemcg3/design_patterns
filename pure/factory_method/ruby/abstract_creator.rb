class BasicFactory
  attr_accessor :someAttribute

  def initialize
    kickstart
    p "initializing #{@someAttribute} factory"
    self
  end

  def factoryMethod
    p "calling factoryMethod on #{@someAttribute}"
  end

  def kickstart
    raise 'kickstart should be overridden by the subclasses'
  end
end

class AFactory < BasicFactory
  def kickstart
    @someAttribute = 'A'
  end
end

class BFactory < BasicFactory
  def kickstart
    @someAttribute = 'B'
  end
end

begin
  @factory = BasicFactory.new
  @factory.factoryMethod
rescue Exception
  p "Exception caught because default factory raises Exception on kickstart"
end

@factory = AFactory.new
@factory.factoryMethod

@factory = BFactory.new
@factory.factoryMethod
