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

  private
  attr_reader :concreteIterator
end

class ConcreteIterator
  def initialize concreteAggregate
    @concreteAggregate = concreteAggregate
    @index = 0
  end

  def first
    @index = 0
    @concreteAggregate.aggregated[@index]
  end

  def next
    @index += 1
    @concreteAggregate.aggregated[@index]
  end

  def isDone?
    @index >= (@concreteAggregate.aggregated.length - 1)
  end

  def currentItem
    @concreteAggregate.aggregated[@index]
  end
end

#############################################################

class Client
  def initialize aggregate
    concreteAggregate = ConcreteAggregate.new aggregate
    aggregate = Aggregate.new concreteAggregate
    concreteIterator = aggregate.createIterator
    iterator = Iterator.new concreteIterator

    p iterator.currentItem
    p iterator.next
    puts "---\n"
    p iterator.first
    while !iterator.isDone? do
      p iterator.next
    end
  end
end

Client.new [1,2,3,4]
