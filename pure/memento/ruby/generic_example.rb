class Originator
  def initialize
    @state = "initialized"
  end

  def update state
    puts "Originator state updated to #{state}\n"
    @state = state
  end

  def show
    puts "Originator state is currently #{@state}\n"
  end

  def setMemento m
    puts "Originator restoring state from memento to #{m.getState}"
    @state = m.getState
  end

  def createMemento
    puts "Originator creating memento with state #{@state}"
    m = Memento.new
    m.setState @state
    m
  end

  private
  attr_accessor :state
end

class Memento
  def getState
    @state
  end

  def setState state
    @state = state
  end

  private
  attr_accessor :state
end

class Caretaker
  attr_accessor :memento
end


o = Originator.new
c = Caretaker.new
c.memento = o.createMemento
o.show
o.update "Updated"
o.show
o.setMemento c.memento
o.show
