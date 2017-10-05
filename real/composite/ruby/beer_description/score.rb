class Score
  # class variable, one copy for all instances of the class
  @@id = 0
  attr_reader :source_general, :source_specific, :color, :aroma, :taste, :palate, :overall

  def initialize(seed=nil)
    @@id += 1
    @id = @@id
    @source_general = seed["source_general"]
    @source_specific = seed["source_specific"]
    @color = seed["color"]
    @aroma = seed["aroma"]
    @taste = seed["taste"]
    @palate = seed["palate"]
    @overall = seed["overall"]
  end

  def output
    #"color: #{@color}\naroma: #{@aroma}\ntaste: #{@taste}\npalate: #{@palate}\noverall: #{@overall}\nfrom #{@source_specific} at #{@source_general}"
    "overall: #{@overall} from #{@source_specific} at #{@source_general}"
  end
end
