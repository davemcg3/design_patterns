class Component
  attr_accessor :children, :attribute, :parent, :level

  def initialize level
    @children = []
    @level = level
  end

  def operation
    puts "From Component at level #{@level} tell children to do Operation"
    @children.each do |child|
      child.operation()
    end
  end

  def traverseUp
    puts "From component at level #{@level} traverse up the chain"
    @parent.traverseUp if !@parent.nil?
  end

  def add component
    @children << component
    component.parent = self
  end

  def remove component
    @children.delete component
    component.parent = nil
  end

  def getChild position
    @children[position]
  end

  def getParent
    @parent
  end
end

class Composite < Component
  def initialize level
    super level
    @attribute = "Composite"
  end

  def operation
    puts "Do operation on #{@attribute} at level #{@level}"
    super
  end
end

class Leaf < Component
  def initialize level
    super level
    @attribute = "Leaf"
  end

  def operation
    puts "Do operation on #{@attribute} at level #{@level}"
  end
end

class Client
  print "Building tree..."
  grandparent = Composite.new 1
  2.times do
    grandparent.add Leaf.new 2
  end

  parent = Composite.new 2
  3.times do
    parent.add Leaf.new 3
  end
  grandparent.add parent
  print " done.\n"

  puts "Do operation on grandparent and watch it traverse down."
  grandparent.operation

  puts "Grab a leaf and traverse back up the tree"
  grandparent.children.last.children.last.traverseUp
end

def run
  Client.new
end

run
