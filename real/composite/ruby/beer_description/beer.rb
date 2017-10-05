class Beer
  @@id = 0
  attr_reader :name, :vintage, :style, :abv, :gravity, :availability, :brewery, :score, :reviews, :ranking, :description

  # def initialize(name=nil, vintage=nil, style_id=nil, abv=nil, gravity=nil, availability=nil, brewery_id=nil, score_id=nil, reviews=nil, ranking=nil, description=nil)
  def initialize(seed=nil)
    @@id += 1
    @id = @@id
    @name = seed[:name]
    @vintage = seed[:vintage]
    @style = seed[:style]
    @abv = seed[:abv]
    @gravity = seed[:gravity]
    @availability = seed[:availability]
    @brewery = seed[:brewery]
    @score = seed[:score]
    @reviews = seed[:reviews]
    @ranking = seed[:ranking]
    @description = seed[:description]
    # @name = name
    # @vintage = vintage
    # @style_id = style_id
    # @abv = abv
    # @gravity = gravity
    # @availability = availability
    # @brewery_id = brewery_id
    # @score_id = score_id
    # if reviews.respond_to? :each
    #   reviews.each do |review|
    #     @reviews.push review
    #   end
    # else
    #   @reviews.push reviews
    # end
    # @ranking = ranking
    # @description = description
  end

  def output parts=nil
    case parts
    when nil
      "#{@name} is a #{@style.output} with an abv of #{@abv} and is available #{@availability.downcase}.\nIt comes from #{@brewery.output}.\n#{@name} is ranked #{@ranking.output}.\nHere's a commercial description: #{@description}\n The latest score we have on it is #{@score.output}"
    else
      this
    end
  end
end
