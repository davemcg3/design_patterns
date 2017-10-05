# this class is probably done wrong. Needs to be an ordered list of beers with a search by beer method instead of an object on a beer
class Ranking
  @@id = 0

  def initialize(rank=nil)
    @@id += 1
    @id = @@id
    @rank = rank
  end

  def output
    # maybe format with commas?
    @rank
  end
end
