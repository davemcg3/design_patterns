# this class is probably done wrong. Needs to be an ordered list of beers
class Ranking
  @@id = 0

  def initialize(beer_id=nil, rank=nil)
    @@id += 1
    @beer_id = beer_id
    @rank = rank
  end
end