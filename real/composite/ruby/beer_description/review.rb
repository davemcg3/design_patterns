class Review
  @@id = 0

  def initialize(score_id=nil, note_id=nil, author=nil)
    @@id += 1
    @score_id = score_id
    @note_id = note_id
    @author = author
    @created_timestamp = Time.now
  end
end
