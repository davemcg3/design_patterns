class Builder
  def buildPart
    raise "Method not implemented in abstract class"
  end
end

class ConcreteBuilderA
  def buildPart
    Part.new "A"
  end
end

class ConcreteBuilderB
  def buildPart
    Part.new "B"
  end
end

class ConcreteBuilderC
  def buildPart
    Part.new "C"
  end
end

class Part
  attr_accessor :attribute

  def initialize attribute
    @attribute = attribute
  end
end


class DirectorOne
  attr_accessor :parts

  def initialize
    @parts = []
  end

  def construct
    @parts << ConcreteBuilderA.new.buildPart
    @parts << ConcreteBuilderB.new.buildPart
    @parts << ConcreteBuilderC.new.buildPart
  end

  def getWhole
    @parts
  end

  def describe
    "DirectorOne requires 3 parts to be complete: A,B,C"
  end
end

class DirectorTwo
  attr_accessor :parts

  def initialize
    @parts = []
  end

  def construct
    @parts << ConcreteBuilderA.new.buildPart()
    @parts << ConcreteBuilderB.new.buildPart()
  end

  def getWhole
    @parts
  end

  def describe
    "DirectorTwo requires 2 parts to be complete: A,B"
  end
end

def run directors
  directors.each do |director|
    d = director.new
    d.construct
    puts d.describe
    p d.getWhole
  end
end

run [DirectorOne, DirectorTwo]
