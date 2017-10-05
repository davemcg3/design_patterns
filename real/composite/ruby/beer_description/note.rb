class Note
  @@id = 0
  attr_reader :score, :description

  def initialize(seed=nil)
    @@id += 1
    @id = @@id
    @score = seed[:score]
    @description = seed[:description]
  end
end
