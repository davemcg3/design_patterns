class Handler
  attr_reader :successor
  def HandleRequest request
    # removed for logic control as detailed in the lengthy comment below
    # raise "Not implemented"

    successor.HandleRequest request
  end

  def set_successor successor
    @successor = successor
  end

  # let's talk about this one. I'm putting the initialize on the bottom, which is weird for Ruby from what I've seen, but I'm doing it because this in the pattern structure Handler is
  # supposed to be an abstract class, but in other languages like C++ you can apparently still use the client to call the abstract class methods and if the program is set up correctly
  # the request gets passed along to the correct concrete class, but in Ruby we need to write a little bit of that connecting logic, so the question of where do we want to put that
  # logic comes up. We can create a new object to handle the business logic, but the pattern does discuss the possibility of the Handler itself handling that logic, so I've decided to
  # follow that advice and instantiate the Abstract class and put the logic in the instance and allow the client object to call the methods on the instance. This means that I needed to
  # remove the raise from the HandleRequest method and use that to kick off the chain, so our abstract class isn't abstract anymore.
  def initialize
    set_successor ConcreteHandler1.new
    successor.set_successor ConcreteHandler2.new
  end
end

class ConcreteHandler1 < Handler
  def HandleRequest request
    # handles strings just so we can differentiate between the chain links
    if request.is_a? String
      puts request + "\n"
    else
      successor.HandleRequest request unless successor.nil?
    end
  end

  def initialize
    # noop to avoid stack too deep
  end
end

class ConcreteHandler2 < Handler
  def HandleRequest request
    # handles arrays just so we can differentiate between the chain links
    if request.is_a? Array
      request.each do |item|
        puts item + "\n"
      end
    else
      successor.HandleRequest request unless successor.nil?
    end
  end

  def initialize
    # noop to avoid stack too deep
  end
end

class Client
  def initialize
    @handler = Handler.new
  end

  def HandleRequest request
    @handler.HandleRequest request
  end
end

client = Client.new
client.HandleRequest "string"
client.HandleRequest ["This", "is", "an", "Array"]
client.HandleRequest 4 # not handled
