class Facade
  def run
    print SubclassComponent1.new.doSomething + " " + SubclassComponent2.new.doSomethingMore + " " + SubclassComponent3.new.doSomethingAdditional + "\n"
  end

  def nur
    print SubclassComponent3.new.doSomethingAdditional + " " + SubclassComponent2.new.doSomethingMore + " " + SubclassComponent1.new.doSomething + "\n"
  end
end

class SubclassComponent1
  def doSomething
    "pretty simple"
  end
end

class SubclassComponent2
  def doSomethingMore
    "but adding more stuff makes it not so simple"
  end
end

class SubclassComponent3
  def doSomethingAdditional
    "and adding even more starts making it complex"
  end
end

class Client
  def interactWithSubclasses
    print "client dealing with each subclass directly is possible but more for the client to do:\n"
    print SubclassComponent1.new.doSomething + " " + SubclassComponent2.new.doSomethingMore + " " + SubclassComponent3.new.doSomethingAdditional + "\n"
  end

  def interactWithFacade
    print "client dealing only with the facade is much easier:\n"
    Facade.new.run
    print "and if a Facade needs to adjust the methods it's still easy for the client because the facade can just expose a new interface:\n"
    Facade.new.nur
  end
end

def run
  client = Client.new
  client.interactWithSubclasses
  client.interactWithFacade
end

run
