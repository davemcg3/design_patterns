class Review
  @@id = 0
  attr_reader :note, :author, :created_timestamp

  def initialize(seed=nil)
    @@id += 1
    @id = @@id
    @note = seed[:note]
    @author = seed[:author]
    @created_timestamp = Time.now
  end
end
