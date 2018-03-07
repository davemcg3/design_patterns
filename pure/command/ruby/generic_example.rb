class Command
  def initialize(receiver)
    @receiver = receiver
  end

  def execute
    raise "Not Implemented"
  end
end

class ConcreteCommand < Command
  def execute
    @receiver.action
  end
end

class Receiver
  def action
    "Receiver executing command"
  end
end

class Invoker
  attr_reader :history

  def execute(cmd)
    @history ||= []
    @history << cmd.execute
  end
end

class Client
  def initialize
    @receiver = ConcreteCommand.new(Receiver.new)
    @invoker = Invoker.new
  end

  def perform_action
    @invoker.execute(@receiver)
  end

  def history
    @invoker.history
  end
end

@client = Client.new
3.times do
  @client.perform_action
end
p @client.history
