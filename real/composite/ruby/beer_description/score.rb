class Score
  # class variable, one copy for all instances of the class
  @@id = 0

  def initialize(value=nil, source_general=nil, source_specific=nil, color=nil, aroma=nil, taste=nil, palate=nil, overall=nil)
    @@id += 1
    @value = value
    @source_general = source_general
    @source_specific = source_specific
    @color = color
    @aroma = aroma
    @taste = taste
    @palate = palate
    @overall = overall
  end
end