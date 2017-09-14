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

class StrawProduct < Product
  def initialize
    @name = :StrawProduct
  end
end

class Creator
  attr_accessor :product

  def initialize product
    @product = product.new
  end

  def factoryMethod
    @product
  end

  def anOperation
    p "about to run factoryMethod on #{self.class}"
    @product = factoryMethod
  end
end

def run products
  products.each do |product|
    begin
      @creator = Creator.new product
      p @creator.anOperation.name
    rescue Exception
      p 'Exception caught, skipping'
    end
  end
end

run [Product, ConcreteProduct, StrawProduct]
