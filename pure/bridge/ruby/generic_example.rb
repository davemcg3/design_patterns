class Client
  def runMethod target
    target.operation
  end
end

class Abstraction
  def operation
    Implementor.new.operationImp
  end
end

class RefinedAbstraction < Abstraction
end

module AbstractImplementor
  def operationImp
    raise "Method not implemented."
  end
end

class Implementor
  include AbstractImplementor

  def initialize
    if rand(2) === 0
      @concrete = ConcreteImplementorA.new
    else
      @concrete = ConcreteImplementorB.new
    end
  end

  def operationImp
    @concrete.operationImp
  end
end

class ConcreteImplementorA
  include AbstractImplementor

  def operationImp
    print "ConcreteImplementorA operationImp\n"
  end
end

class ConcreteImplementorB
  include AbstractImplementor

  def operationImp
    print "ConcreteImplementorB operationImp\n"
  end
end

def run
  target = Abstraction.new
  client = Client.new
  client.runMethod target
end

run
