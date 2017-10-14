# we're ignoring the issue with send(:new)
# this is a fun exercise in programming but a terrible example of a Singleton because you can have more than one instance of Programmer. It's a great example of protecting instantiation so that you can control what happens in it, though.
class Programmer
  private_class_method :new
  attr_reader :name

  # class method
  def self.hire name, skillz
    new name, skillz
  end

  def learn skill
    @skillz.push skill
    print "#{@name} learned #{skill}! Level up!\n"
  end

  def train user, skill
    print "#{@name} is training #{user.name} on #{skill}\n"
    user.learn skill if @skillz.include? skill
  end

  def _clone
    print "Attempting to clone #{@name}\n"
    Programmer.new rescue "Clone failed! There is only one programmer like #{@name}!\n"
  end

  def describe
    print "#{@name} has mad skills with #{@skillz.join(", ")}\n"
  end

  private
  def initialize name, skillz
    @name = name
    @skillz = skillz
    print "Hired #{@name}! "
    describe
  end
end

def run
  tim = Programmer.hire "Tim", ["Bicycling", "Swilling Beer", "Testing", "UI/UX"]
  print tim._clone
  vaughn = Programmer.hire "Vaughn", ["Bicycling", "Swilling Beer"]
  tim.train vaughn, "Testing"
  print vaughn.describe
  print vaughn._clone
end

run
