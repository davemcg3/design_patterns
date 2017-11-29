class AbstractComponent
  def operation
    raise "Method not implemented"
  end
end

class ConcreteComponent < AbstractComponent
  def operation
    print "Component is executing operation\n"
  end
end

module ConcreteDecoratorA
  def addedState
    true
  end
end

module ConcreteDecoratorB
  def addedBehavior
    print "Component has an added behavior\n"
  end
end

def output component
  component.operation
  begin
    component.addedState
    print "Component has an added state\n"
  rescue
    print "Component does not have added state\n"
  end
  begin
    component.addedBehavior
  rescue
    print "Component does not have added behavior\n"
  end
end

def run
  print "***Raw Component***\n"
  component = ConcreteComponent.new
  output component

  print "***Component decorated with A***\n"
  class << component
    include ConcreteDecoratorA
  end
  output component

  print "***Component decorated with A and B***\n"
  class << component
    include ConcreteDecoratorB
  end
  output component
end

run
