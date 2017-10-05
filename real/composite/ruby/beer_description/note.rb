class Note
  @@id = 0

  def initialize(score_id=nil, description=nil)
    @@id += 1
    @score_id = score_id
    @description = description
  end
end