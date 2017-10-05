class Brewery
  # class variable, one copy for all instances of the class
  @@id = 0
  attr_reader :id, :name, :city, :state, :country, :website, :beers

  def initialize(seed=nil)
    @@id += 1
    @id = @@id
    @name = seed["name"]
    @city = seed["city"]
    @state = seed["state"]
    @country = seed["country"]
    @website = seed["website"]
    @beers = []
    if seed["beers"].respond_to? :each
      seed["beers"].each do |beer|
        @beers.push beer
      end
    else
      @beers.push seed["beers"]
    end
  end

  def output
    "#{@name} which hails from #{@state}, #{@country} and can be found at #{@website}. They sell these beers: #{@beers.join(", ")}"
  end
end
