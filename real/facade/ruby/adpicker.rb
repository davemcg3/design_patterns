require 'active_support/core_ext/module/delegation'

class AbstractAd
  extend Delegatable

  def initialize(debug = 0)
    @@debug = debug

    # singletons
    networks.each do |network|
      if network.class == self.class
        return network
      end
    end

    # doesn't exist yet so let's add it
    networks << self

    if @@debug > 0
      p "networks: #{networks.inspect}"
      p "initialized #{self.class}, count: #{networkCount}"
    end
  end

  def thisClass
    @@thisClass ||= nil
  end
  #
  # def networks
  #   @@networks ||= []
  # end
  #
  # def networkCount
  #   networks.length
  # end

  def self.networks
    @@networks ||= []
  end

  def self.networkCount
    self.networks.length
  end

  delegate :networks, to: :class
  delegate :networkCount, to: :class

  def display()
    raise "Not Implemented"
  end
end

class GoogleAd < AbstractAd
  def display
    "Ad from Google Network"
  end
end

class FacebookAd < AbstractAd
  def display
    "Ad from Facebook Network"
  end
end

class AmazonAd < AbstractAd
  def display
    "Ad from Amazon Network"
  end
end

class AdDisplayer
  def initialize debug = 0
    @debug = debug
  end

  def display(network)
    begin
      Object::const_get(network + 'Ad').new.display
    rescue => e
      "Ad-free experience"
        e if @debug > 0
    end
  end
end

class AdNetworkRegistry
  def initialize
    ['Google', 'Facebook', 'Amazon'].each do |network|
      Object::const_get(network + 'Ad').new
    end
  end

  def count
    AbstractAd.networkCount
  end

  def networks
    AbstractAd.networks
  end

  def getAd
    adDisplayer = AdDisplayer.new 1
    # Maybe AB testing different ad networks in a "random" pattern
    # A better way would be a round robin, maybe abstract out the decision method and then you can try different methods
    # at will
    adContent = case (Time.now.sec % 4)
      when 1
        adDisplayer.display('Google')
      when 2
        adDisplayer.display('Facebook')
      when 3
        adDisplayer.display('Amazon')
      else
        # this is obviously a sub-par way to handle the else case, but I wanted to show that you can pass anything to the
        # AdDisplayer and it can handle the input sensibly
        adDisplayer.display('booga booga')
      end

    adContent
  end
end

# class DecisionMethod
#   def decide
#     raise "Not Implemented"
#   end
# end
#
# class DecisionMethodTimeRandom < DecisionMethod
#   def decide
#     (Time.now.sec % 4)
#   end
# end
#
# class DecisonMethodRoundRobin < DecisionMethod
#   def decide
#     # would need to slam this into something like redis on a website so it was available on new requests
#     @last = @last || 0 # initialize
#     @last = @last + 1 # increment
#     @last # return
#   end
# end
#
# class DecisionMethodPicker
#
# end


def run
  registry = AdNetworkRegistry.new
end

# simulate requests coming in at different times to generate different ads
2.times {
  run
  sleep(rand(10) / 10.0) # sleeping for a random amount of milliseconds before rerunning
}
