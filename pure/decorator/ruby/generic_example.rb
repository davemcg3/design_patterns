class AbstractComponent
  def operation
    raise "Method not implemented"
  end
end

class ConcreteComponent < AbstractComponent
  def operation
    print name, " is executing operation\n"
  end

  def name
    "component"
  end
end

class Decorator
  def initialize component
    @decoratedComponent = component
  end

  def operation
    @decoratedComponent.operation
  end
end

class ConcreteDecoratorA < AbstractDecorator
  attr_accessor :addedState

  def initialize component
    super component
    @addedState = true
  end

  def name
    component.name + "A"
  end
end

class ConcreteDecoratorB < AbstractDecorator
  def addedBehavior
    print "Added behavior executing\n"
  end

  def name
    component.name + "B"
  end
end

def run
  component = ConcreteComponent.new
  component.operation

  componentA = ConcreteDecoratorA.new component
  componentA.operation
  p componentA.inspect
  print "Does our decorated component A have an added state? #{componentA.addedState ? "yes" : "no"}\n"

  componentAB = ConcreteDecoratorB.new componentA
  componentAB.operation
  p componentAB.inspect
  print "Does our decorated component AB have an added state? #{componentAB.addedState ? "yes" : "no"}\n"
  componentAB.addedBehavior
end

run
