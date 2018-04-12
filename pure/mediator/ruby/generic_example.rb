# had to add some functionality because a pure structural implementation would be confusing to look back on, so built
# something that allows us to pass messages between colleagues
# colleagues poll mediator for messages, mediator does not keep a direct reference to colleagues
class AbstractMediator
  def initialize
    @messageQueue = []
  end

  def receive_message message
    raise "Not implemented"
  end

  def poll_message colleague
    raise "Not implemented"
  end
end

class ConcreteMediator < AbstractMediator
  def receive_message message
    @messageQueue.push(message)
  end

  def poll_message colleague
    results = @messageQueue.map do |m|
      if m.colleague != colleague
        m
      end
    end
    results.compact
  end
end


class AbstractColleague
  attr_reader :colleague
  def initialize mediator, colleague
    @mediator = mediator
    @colleague = colleague
  end

  def send_message message
    @mediator.receive_message message
  end

  def get_message
    @mediator.poll_message(@colleague).each do |r|
      p "printing message from #{@colleague}, message: #{r.message}"
    end
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

  colleague1.get_message
  colleague2.get_message
end

run