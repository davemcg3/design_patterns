class Product
  attr_accessor :name

  def initialize
    @name = :GenericProdcut
  end
end

class ConcreteProduct < Product
  def initialize
    @name = :ConcreteProduct
  end
end

class Creator
  attr_accessor :product

  def factoryMethod
    raise 'factoryMethod should be overridden in subclass'
  end

  def anOperation
    p "about to run factoryMethod on #{self.class}"
    @product = factoryMethod
  end
end

class ConcreteCreator < Creator
  def factoryMethod
    ConcreteProduct.new
  end
end

def run factories
  factories.each do |factory|
    begin
      @creator = factory.new
      p @creator.anOperation.name
    rescue Exception
      p 'Exception caught, skipping'
    end
  end
end

run [Creator, ConcreteCreator]
