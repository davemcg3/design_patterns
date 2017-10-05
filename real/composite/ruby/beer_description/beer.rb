beer {
  id
      name
      vintage
      style
      abv (alcohol by volume)
      gravity
      availability
      official note object
      brewery object
      score objects
      aggregated score object
      review objects
      ranking
    }

class Beer
  @@id = 0

  def initialize(name=nil, vintage=nil, style_id=nil, abv=nil, gravity=nil, availability=nil, note_id=nil, brewery_id=nil, score_id=nil, reviews=nil, ranking=nil, description=nil)
    @@id += 1
    @name = name
    @vintage = vintage
    @style_id = style_id
    @abv = abv
    @gravity = gravity
    @availability = availability
    @note_id = note_id
    @brewery_id = brewery_id
    @score_id = score_id
    if reviews.respond_to? :each
      reviews.each do |review|
        @reviews.push review
      end
    else
      @reviews.push reviews
    end
    @ranking = ranking
    @description = description
  end
end
