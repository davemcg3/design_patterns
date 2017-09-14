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
    @someAttribute = 'default'
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

@factory = BasicFactory.new
@factory.factoryMethod

@factory = AFactory.new
@factory.factoryMethod

@factory = BFactory.new
@factory.factoryMethod
