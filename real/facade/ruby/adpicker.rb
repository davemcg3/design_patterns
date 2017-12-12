class AbstractAd
  def initialize(debug = 0)
    @@debug = debug

    # doesn't exist yet so let's add it
    self.class.networks << self

    if @@debug > 0
      p "networks: #{self.class.networks.inspect}"
      p "initialized #{self.class}, count: #{self.class.networkCount}"
    end
  end

  class << self
    def new
      # singletons
      self.networks.each do |network|
        if network.class == self
          return network
        end
      end

      super
    end

    def networks
      @@networks ||= []
    end

    def networkCount
      self.networks.length
    end
  end

  def to_s
    self.class.name
  end

  def display
    @displayed = displayed + 1
    show
  end

  def displayed
    @displayed ||= 0
  end

  def reset_displayed
    @displayed = 0
  end

  def show
    raise "Not Implemented"
  end
end

class GoogleAd < AbstractAd
  def show
    "Ad from Google Network"
  end
end

class FacebookAd < AbstractAd
  def show
    "Ad from Facebook Network"
  end
end

class AmazonAd < AbstractAd
  def show
    "Ad from Amazon Network"
  end
end

###############################################################################

class AdDisplayer
  def initialize debug = 0
    @debug = debug
  end

  def display(network)
    begin
      Object::const_get(network + 'Ad').new.display
    rescue => e
      if @debug > 0
        e
      else
        "Ad-free experience"
      end
    end
  end
end

###############################################################################

class AbstractAdRotationStrategy
  def initialize (count = nil)
    @count = count unless count.nil?
  end

  def decide
    raise "Not Implemented"
  end
end

class DecisionMethodTimeRandom < AbstractAdRotationStrategy
  def decide
    (Time.now.sec % 4)
  end
end

class DecisonMethodRoundRobin < AbstractAdRotationStrategy
  def decide
    raise "Unknown network count" if @count.nil? # would need better error checking for a production app
    # would need to slam this into something like redis on a website so it was available on new requests
    @last = @last || -1 # initialize
    @last = @last + 1 # increment
    @last % @count # return
  end
end

###############################################################################

class AdNetworkRegistry
  attr_reader :rotationStrategy

  def initialize (rotationStrategy = "round robin", adfree = false)
    setStrategy rotationStrategy, adfree
  end

  def setStrategy (rotationStrategy = "round robin", adfree = false)
    case rotationStrategy
      when "randomized"
        # networks are lazy-loaded
        @rotationStrategy = DecisionMethodTimeRandom.new
      else
        networks = ['Google', 'Facebook', 'Amazon']
        networks << "Abstract" if adfree # need something to instantiate so can't use "booga booga" here
        # need the network count to instantiate the decision strategy so eager load networks
        networks.each do |network|
          Object::const_get(network + 'Ad').new
        end
        @rotationStrategy = DecisonMethodRoundRobin.new self.count
    end

    self.networks.each do |network|
      network.reset_displayed
    end
  end

  def count
    AbstractAd.networkCount
  end

  def networks
    AbstractAd.networks
  end

  def networkSummary
    summary = self.count.to_s + " networks defined: "
    networkSummary = {}
    self.networks.each do |network|
      networkSummary[network.to_s] = network.displayed
    end
    summary + networkSummary.map {|k, v| "#{k}: #{v}"}.join(', ')
  end

  def getAd
    adDisplayer = AdDisplayer.new
    adContent = case @rotationStrategy.decide
      when 0
        adDisplayer.display('Google')
      when 1
        adDisplayer.display('Facebook')
      when 2
        adDisplayer.display('Amazon')
      else
        # this is obviously a sub-par way to handle the else case, but I wanted to show that you can pass anything to the
        # AdDisplayer and it can handle the input sensibly
        adDisplayer.display('booga booga')
    end

    adContent
  end
end

###############################################################################

def simulateAdsBeingShown registry, testCases = 1
  print "\n" + "="*24
  print "\n#{testCases} ads being shown using the #{registry.rotationStrategy.class} Strategy\n"
  testCases.times {
    print registry.getAd + "\n"
    # simulate requests coming in at different times to generate different ads on a randomized strategy
    sleep(rand(10) / 10.0) if registry.rotationStrategy.class == DecisionMethodTimeRandom # sleeping for a random amount of milliseconds before rerunning
  }
  print registry.networkSummary + "\n"
  print "="*24 + "\n"
end

def run
  testCases = 30

  registry = AdNetworkRegistry.new
  simulateAdsBeingShown registry, testCases

  registry.setStrategy "randomized", true
  simulateAdsBeingShown registry, testCases

end

run
