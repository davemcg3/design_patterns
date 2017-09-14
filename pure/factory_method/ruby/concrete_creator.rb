class Widget
  attr_accessor :createdBy

  def initialize (createdBy)
    @createdBy = createdBy
  end

  def description
    "Widget created by #{@createdBy}"
  end
end

class BasicFactory
  attr_accessor :someAttribute

  def initialize
    kickstart
    p "initializing #{@someAttribute} factory"
    self
  end

  def factoryMethod
    Widget.new @someAttribute
  end

  def kickstart
    @someAttribute = 'default'
  end
end

class AFactory < BasicFactory
  def kickstart
    @someAttribute = 'A'
  end
end

class BFactory < BasicFactory
  def kickstart
    @someAttribute = 'B'
  end
end

@factories = []
@factories << BasicFactory.new
@factories << AFactory.new
@factories << BFactory.new

@widgets = []
p "And the whole point of a factory? To create lots of widgets."
@factories.each do |factory|
  20.times do
    @widgets << factory.factoryMethod
  end
end

@widgets.each do |widget|
  p widget.description
end

p "#{@widgets.length} widgets now exist"
