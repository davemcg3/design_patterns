eval File.read 'generic_example.rb'

class StrawProduct < Product
  def initialize
    @name = :StrawProduct
  end
end

class StrawCreator < Creator
  def factoryMethod
    StrawProduct.new
  end
end

run [StrawCreator]
