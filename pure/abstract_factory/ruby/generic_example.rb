class AbstractFactory

  def createProductA factory
    factory.createProductA
  end

  def createProductB factory
    factory.createProductB
  end
end

class ConcreteFactory1
  attr_accessor :created_by

  def initialize
    @created_by = "Factory 1"
  end

  def createProductA
    "Product A created by #{@created_by}"
  end

  def createProductB
    "Product B created by #{@created_by}"
  end
end

class ConcreteFactory2
  attr_accessor :created_by

  def initialize
    @created_by = "Factory 2"
  end

  def createProductA
    "Product A created by #{@created_by}"
  end

  def createProductB
    "Product B created by #{@created_by}"
  end
end

def run factories
  abstractFactory = AbstractFactory.new

  factories.each do |factory|
    p abstractFactory.createProductA factory
    p abstractFactory.createProductB factory
  end
end

run [ConcreteFactory1.new, ConcreteFactory2.new]
