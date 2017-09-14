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
    raise 'kickstart should be overridden by the subclasses'
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

begin
  @factory = BasicFactory.new
  @widget = @factory.factoryMethod
  p @widget.description
rescue Exception
  p "Exception caught because default factory raises Exception on kickstart"
end

@widgets = []
@factory = AFactory.new
@widgets << @factory.factoryMethod

@factory = BFactory.new
@widgets << @factory.factoryMethod

@widgets.each do |widget|
  p widget.description
end
