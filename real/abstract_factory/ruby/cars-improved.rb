class CarFactory
  # This is our abstract factory
  def getModel factory, type
    factory.getModel type
  end

  def getName factory
    factory.getName
  end
end

class Brand
  # There was a lot of duplication in the cars.rb file, so we cut it down with the prototype pattern and a parameterized hash access
  def initialize name='', models={}
    @name = name
    @models = models
  end

  # This is our parameterized hash access
  def getModel type
    @models[type]
  end

  # Return the name of our factory
  def getName
    @name
  end

  # This is how we create new factories off a prototype factory
  def _clone name, models
    Brand.new name, models
  end
end

# create our prototype
brand_prototype = Brand.new

# create our factories based off our prototype factory, just adjusting the data as needed
honda = brand_prototype._clone('Honda', {
  compact: "Fit",
  midsize: "Civic",
  fullsize: "Accord",
  truck: "Ridgeline",
  van: "Element"
})
toyota = brand_prototype._clone('Toyota', {
  compact: "Yaris",
  midsize: "Corolla",
  fullsize: "Camry",
  truck: "Tundra",
  van: "Sienna"
})
nissan = brand_prototype._clone('Nissan', {
  compact: "Versa",
  midsize: "Sentra",
  fullsize: "Altima",
  truck: "Titan",
  van: "NV Passenger"
})

# our main method
def run factories
  # declare our abstract facotry
  carFactory = CarFactory.new

  # Using a lookup hash will reduce the duplication from the case statement in cars.rb
  types = {c: :compact, 1.to_s => :compact, m: :midsize, 2.to_s => :midsize, f: :fullsize, 3.to_s => :fullsize, t: :truck, 4.to_s => :truck, v: :van, 5.to_s => :van, q: :quit, e: :quit, 6.to_s => :quit}
  # Hash @ith Indifferent Access without Rails
  types.default_proc = proc do |h, k|
    case k
      when String then sym = k.to_sym; h[sym] if h.key?(sym)
      when Symbol then str = k.to_s; h[str] if h.key?(str)
    end
  end

  p "Welcome to the car selector. We'll help you learn what models various brands offer in your selected class of vehicle. Currently only Japanese brands are available, and we only maintain a limited portion of the lineup for each brand."

  loop do
    p "Which car class are you interested in? 1) compact; 2) midsize; 3) fullsize; 4) truck; 5) van; 6) exit or quit"
    carClass = gets

    initial = types[carClass[0].downcase]

    # handle unexpected input
    if initial.nil?
      p "I don't know what that means."
      next
    end

    # exit if the user is done
    if initial == :quit
      p "Thanks for using the car selector!"
      exit 0
    end

    # make the call to our abstract factory passing in the factory on which we want to call the factory method
    if initial
      factories.each do |factory|
        p "#{carFactory.getName factory} #{carFactory.getModel factory, initial}"
      end
    end
  end
end

# run our program with our created factories
run [honda, toyota, nissan]
