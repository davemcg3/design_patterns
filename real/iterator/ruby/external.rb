require 'active_support/core_ext/module/delegation'

class Aggregate
  def initialize concreteAggregate
    @concreteAggregate = concreteAggregate
  end

  delegate :createIterator, to: :concreteAggregate

  private
  attr_reader :concreteAggregate
end


class ConcreteAggregate
  attr_reader :aggregated

  def initialize aggregated
    @aggregated = aggregated
  end

  def createIterator
    ConcreteIterator.new self
  end
end

#############################################################

class Iterator
  def initialize concreteIterator
    @concreteIterator = concreteIterator
  end

  delegate :first, to: :concreteIterator
  delegate :next, to: :concreteIterator
  delegate :isDone?, to: :concreteIterator
  delegate :currentItem, to: :concreteIterator
  delegate :random, to: :concreteIterator

  private
  attr_reader :concreteIterator
end

class ConcreteIterator
  def initialize concreteAggregate
    @concreteAggregate = concreteAggregate
    @index = -1 # first call is probably next so don't skip index 0, and any others set explicitly
  end

  def first
    @index = 0
    currentItem
  end

  def next
    @index += 1
    currentItem
  end

  def isDone?
    @index >= (@concreteAggregate.aggregated.length - 1)
  end

  def currentItem
    @concreteAggregate.aggregated[@index]
  end

  def random
    @concreteAggregate.aggregated[rand(0...@concreteAggregate.aggregated.length)]
  end
end

#############################################################

class Client
  def initialize aggregate
    concreteAggregate = ConcreteAggregate.new aggregate
    aggregate = Aggregate.new concreteAggregate
    concreteIterator = aggregate.createIterator
    @iterator = Iterator.new concreteIterator
  end

  def handleInput input
    if input == "s" || @iterator.isDone?
      p @iterator.first
    elsif input == "r"
      p @iterator.random
    else
      p @iterator.next
    end
  end
end

#############################################################

# setup data, funny misattributed quotes
quotes = [
  "It's not the size of the dog in the fight, it's the size of the fight in the dog. -Michael Vick",
  "Friends, Romans, Countrymen, lend me your ears. -Vincent Van Gogh",
  "You miss 100% of the shots you don't take. -Lee Harvey Oswald",
  "There is no elevator to success, you have to take the stairs. -Stephen Hawking",
  "Tear down this wall! -Dale Earnhardt",
  "Good to the last drop. -Otis Elevators",
  "What goes up, must come down. -Amelia Earhart"
]

# initialize
client = Client.new quotes

# get input
print "Quote Box"
loop do
  print "\nPress q to quit, s to start over, r for random, anything else for the next quote.\n> "
  input = gets.chomp.downcase
  print "\n"

  # exit if the user is done
  if input == "q"
    print "\"No more rhyming, I mean it!\" -Vizzini \n\"Anybody got a peanut?\" -Fezzik\n\n"
    exit 0
  end

  client.handleInput input
end
