class Brewery
  # class variable, one copy for all instances of the class
  @@id = 0
  @beers = Array.new

  def initialize(name=nil, city=nil, state=nil, country=nil, website=nil, beers=nil)
    @@id += 1
    @name = name
    @city = city
    @state = state
    @country = country
    @website = website
    if beers.respond_to? :each
      beers.each do |beer|
        @beers.push beer
      end
    else
      @beers.push beers
    end
  end
end