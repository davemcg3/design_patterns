class Style
  @@id = 0
  attr_reader :id, :style

  def initialize(style=nil)
    @@id += 1
    @id = @@id
    @style = style
  end

  def output
    @style["style"]
  end
end
