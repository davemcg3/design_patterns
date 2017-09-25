class Component
  attr_accessor :children, :attribute

  def initialize
    @children = []
  end

  def operation
    p "From Component tell children to do Operation"
    @children.each do |child|
      child.operation()
    end
  end

  def add component
    @children << component
  end

  def remove component
    @children.delete component
  end

  def getChild position
    @children[position]
  end
end

class Composite < Component
  def initialize
    super
    @attribute = "Composite"
  end

  def operation
    p "Do operation on #{@attribute}"
    super
  end
end

class Leaf < Component
  def initialize
    super
    @attribute = "Leaf"
  end

  def operation
    p "Do operation on #{@attribute}"
  end
end

class Client
  grandparent = Composite.new
  2.times do
    grandparent.add Leaf.new
  end

  parent = Composite.new
  3.times do
    parent.add Leaf.new
  end
  grandparent.add parent

  grandparent.operation
end

def run
  Client.new
end

run
