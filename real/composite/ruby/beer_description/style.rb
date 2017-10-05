class Style
  @@id = 0

  def initialize(style=nil)
    @@id += 1
    @style = style
  end
end