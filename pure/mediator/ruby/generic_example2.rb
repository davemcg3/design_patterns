# had to add some functionality because a pure structural implementation would be confusing to look back on, so built
# something that allows us to pass messages between colleagues
# mediator keeps a direct reference to colleagues, pushes messages to colleagues upon receipt
class AbstractMediator
  def initialize
    @colleagues = []
  end

  def register colleague
    @colleagues.push colleague
  end

  def receive_message message
    raise "Not implemented"
  end
end

class ConcreteMediator < AbstractMediator
  def receive_message message
    @colleagues.each do |c|
      if c.colleague != message.colleague
        c.receive_message message
      end
    end
  end
end


class AbstractColleague
  attr_reader :colleague
  def initialize mediator, colleague
    @colleague = colleague
    @mediator = mediator
    @mediator.register self
  end

  def send_message message
    @mediator.receive_message message
  end

  def receive_message m
    p "printing message from #{@colleague}, message: #{m.message}"
  end
end

class ConcreteColleagueOne < AbstractColleague
end

class ConcreteColleagueTwo < AbstractColleague
end

class Message
  attr_reader :colleague, :message
  def initialize sender, message
    @colleague = sender
    @message = message
  end
end

def run
  mediator = ConcreteMediator.new
  colleague1 = ConcreteColleagueOne.new mediator, "one"
  colleague2 = ConcreteColleagueTwo.new mediator, "two"

  colleague1.send_message Message.new colleague1.colleague, "Sending message from one"
  colleague2.send_message Message.new colleague2.colleague, "Sending message from two"
end

run