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

class Adapter
  include Target

  def request
    adaptee = Adaptee.new
    adaptee.specificRequest
  end
end

class Adaptee
  def specificRequest
    print "specificRequest in Adaptee called\n"
  end
end

def run
  target = Adapter.new
  client = Client.new
  client.runMethod target
end

run()
