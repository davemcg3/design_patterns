class AbstractFlyweight
  def operation (extrinsicState)
    raise "Not implemented"
  end
end

class ConcreteFlyweight < AbstractFlyweight
  def initialize
    @intrinsicState = "stored in the concrete flyweight"
    print "ConcreteFlyweight instantiated\n"
  end

  def operation (extrinsicState)
    print "Running operation in Concrete Flyweight with extrinsic state " + extrinsicState + " and intrinsic state is " + @intrinsicState + "\n"
  end
end

class UnsharedConcreteFlyweight < AbstractFlyweight
  def initialize
    @allState = "stored in the unshared concrete flyweight"
    print "UnsharedConcreteFlyweight instantiated\n"
  end

  def operation (extrinsicState)
    print "Running operation in Concrete Flyweight with extrinsic state " + extrinsicState + " and all state is " + @allState + "\n"
  end
end

class FlyweightFactory
  def initialize
    @pool = {}
  end

  def getFlyweight(key)
    # create new flyweight if it doesn't exist
    if @pool[key].nil?
      print key.to_s + " not found, instantiating new flyweight\n"
      @pool[key] = key.new
    end
    # return flyweight
    @pool[key]
  end
end

class Client
  def initialize(factory)
    print "Instantiating new concrete flyweight and executing operation: \n"
    factory.getFlyweight(ConcreteFlyweight).operation("extrinsic state")
    print "\n"

    print "Finding existing concrete flyweight and executing operation: \n"
    factory.getFlyweight(ConcreteFlyweight).operation("extrinsic state")
    print "\n"

    print "Instantiating new unshared concrete flyweight and executing operation: \n"
    factory.getFlyweight(UnsharedConcreteFlyweight).operation("extrinsic state")
    print "\n"

    print "Finding existing unshared concrete flyweight and executing operation: \n"
    factory.getFlyweight(ConcreteFlyweight).operation("extrinsic state")
    print "\n"
  end
end

def run
  client = Client.new(FlyweightFactory.new)
end

run
