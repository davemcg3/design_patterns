class Product
  attr_accessor :name

  def initialize
    @name = :GenericProduct
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
  # we're only storing the products in the factory so if we lose a reference to the factory the products are lost as well
  attr_accessor :product, :products

  def initialize product
    @product = product
    @products = []
    p "Initialized #{@product} factory"
  end

  def factoryMethod
    @products << @product.new
  end

  def anOperation
    @names = []
    @products.each do |widget|
      @names << widget.name
    end
    @names
  end
end

def run products
  products.each do |product|
    begin
      # each loop we lose the reference to the factory of the previous loop, so the products are lost
      @creator = Creator.new product
      3.times do
        @creator.factoryMethod
      end
      p @creator.anOperation
    rescue Exception
      p "Exception caught, skipping"
    end
  end
end

run [Product, ConcreteProduct, StrawProduct]
