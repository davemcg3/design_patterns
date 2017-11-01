class Client
  def runMethod target
    target.request
  end
end

module Target
  # abstract
  def request
    raise "Method not implemented"
  end
end

module Adaptee
  def specificRequest
    print "specificRequest in Adaptee called\n"
  end
end

class Adapter
  include Target
  include Adaptee

  def request
    specificRequest
  end
end

def run
  # not in love with instantiating Adapter instead of Target, but Ruby doesn't have interfaces or abstract classes so the cleanest way to do this is by making it a module that raises errors when its methods are called and including the functionality, then if a method defined on Target isn't defined on the class mixing-in its methods the exception will be raised
  target = Adapter.new
  client = Client.new
  client.runMethod target
end

run()
