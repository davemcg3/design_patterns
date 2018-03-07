class Handler
  # enhancement note: base references the Handler class so we can dynamically run the chain with "new" inputs, which we do in ConcreteHandler2
  attr_reader :successor, :base

  def HandleRequest request
    # removed for logic control as detailed in the lengthy comment below
    # raise "Not implemented"
    log "in parent handler\n"
    log successor.inspect
    successor.HandleRequest request
  end

  # set instance variables
  def set_successor successor
    @successor = successor
  end

  def set_base base
    @base = base
  end

  def set_debug debug
    @debug = debug
  end

  # utility function
  def log message
    puts message unless @debug.nil?
  end

  # buildChain and addLink are used to build out the chain by passing in an array of classes
  def buildChain chain # chain is an array
    chain.each do |link|
      addLink link, self
    end
  end

  def addLink link, base
    if @successor.nil?
      set_successor link.new
      successor.set_base base
    else
      successor.addLink link, base
    end
  end

  # let's talk about this one. I'm putting the initialize on the bottom, which is weird for Ruby from what I've seen, but I'm doing it because this in the pattern structure Handler is
  # supposed to be an abstract class, but in other languages like C++ you can apparently still use the client to call the abstract class methods and if the program is set up correctly
  # the request gets passed along to the correct concrete class, but in Ruby we need to write a little bit of that connecting logic, so the question of where do we want to put that
  # logic comes up. We can create a new object to handle the business logic, but the pattern does discuss the possibility of the Handler itself handling that logic, so I've decided to
  # follow that advice and instantiate the Abstract class and put the logic in the instance and allow the client object to call the methods on the instance. This means that I needed to
  # remove the raise from the HandleRequest method and use that to kick off the chain, so our abstract class isn't abstract anymore.
  def initialize chain=nil, debug=nil
    set_debug debug

    # build chain, but only on the base class
    buildChain chain.nil? ? [ConcreteHandler1, ConcreteHandler2, ConcreteHandler3, Terminus] : chain if self.instance_of? Handler
  end
end

class ConcreteHandler1 < Handler
  def HandleRequest request
    log "in string handler\n"
    # handles strings just so we can differentiate between the chain links
    if request.is_a? String
      puts request + "\n"
    else
      successor.HandleRequest request unless successor.nil?
    end
  end
end

class ConcreteHandler2 < Handler
  def HandleRequest request
    log "in array handler\n"
    # handles arrays just so we can differentiate between the chain links
    if request.is_a? Array
      request.each do |item|
        # instead of printing each item like the generic example we'll pass them back through the chain to be handled
        base.HandleRequest item
      end
    else
      successor.HandleRequest request unless successor.nil?
    end
  end
end

# Just to show how easy it is to chain handlers added a new custom class below and this handler
class ConcreteHandler3 < Handler
  def HandleRequest request
    log "in custom handler\n"
    # handles arrays just so we can differentiate between the chain links
    if request.is_a? Custom
      # You can add as many new handlers as you want for whatever you need
      puts request.message
    else
      successor.HandleRequest request unless successor.nil?
    end
  end
end

class Terminus < Handler
  # use this class to handle any unhandled inputs
  def HandleRequest request
    puts "Can't seem to do anything with (#{request.class}) #{request}\n"
  end
end

class Custom
  attr_reader :message
  def initialize message
    @message = message
  end
end

class Client
  def initialize chain=nil
    @handler = Handler.new chain #,true # uncomment true to turn on debugging
  end

  def HandleRequest request
    @handler.HandleRequest request
  end
end

client = Client.new
client.HandleRequest "\nCHAIN 1"
client.HandleRequest ["This", "is", "an", "Array"]
client.HandleRequest 4
client.HandleRequest [["Double", "deep", "array", {not: "handled"}], "WAT", 3.14]
client.HandleRequest Custom.new "Custom"

# can create new chains in any order at runtime now
client = Client.new [ConcreteHandler3, ConcreteHandler1, Terminus]
client.HandleRequest "\nCHAIN 2"
client.HandleRequest ["nope"]
client.HandleRequest Custom.new "oh yeah"
