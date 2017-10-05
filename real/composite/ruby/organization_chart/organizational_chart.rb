class BoardOfDirectors
  attr_accessor :ceo

  def initialize
    @ceo = nil
  end

  def appointCeo employee
    # c-level executives should be singletons, but we haven't gotten to that pattern yet
    employee.supervisor = self
    @ceo = employee
    puts "Appointed #{employee.to_s}"
  end

  def removeCeo employee
    # probably deletes the whole tree
    @ceo.delete employee
  end

  def rollCall
    puts "*" * 40
    puts "\nOrganizational roll call:"
    @ceo.rollCall
  end

  def giveOrder
    puts "\nBoard of Directors says, \"Make money!\""
    @ceo.receiveOrder "Make money!"
  end

  def receiveComplaint complaint
    puts "... all complaints are ignored...\n\n"
  end

  def to_s
    "the Board of Directors"
  end
end

class Employee
  attr_accessor :supervisor, :subordinates, :role, :order, :complaint, :department, :position

  def initialize employee, role=nil, department=nil
    employee.supervisor = nil if !employee.nil?
    @subordinates = []
    @department = department
    if role.nil?
      case @department
      when "Engineering"
        role = EngineerRole
      when "Sales"
        role = SalesRole
      else
        role = SalesRole
      end
    else
      @role = role
    end
    extend role
    setPosition
  end

  def setPosition
    if @subordinates.count < 1
      @position = "worker"
    else
      @position = "supervisor"
    end
  end

  def hireEmployee employee
    employee.supervisor = self
    @subordinates << employee
    setPosition
    puts "Hired #{employee.to_s}"
  end

  def fireEmployee employee
    employee.supervisor = nil
    @subordinates.delete employee
    setPosition
  end

  def giveOrder order
    puts "#{to_s} says, \"#{@order}\"" if !@order.nil?
    @subordinates.each do |underling|
      underling.receiveOrder @order
    end
  end

  def receiveOrder order
    giveOrder @order
    sendComplaint @complaint
    hireEmployee Employee.new nil, nil, @department if @role != CeoRole
    # Sales gets more employees than Engineering
    hireEmployee Employee.new nil, nil, @department if @role != CeoRole if @department == "Sales"
  end

  def sendComplaint complaint
    puts "#{to_s} says to #{@supervisor.to_s}, \"#{@complaint}\""
    supervisor.receiveComplaint @complaint
  end

  def receiveComplaint complaint
    puts "... all complaints are ignored..."
  end

  def rollCall
    print "I am #{to_s}, a #{@position}, my supervisor is #{@supervisor.to_s}"
    print ", I have #{@subordinates.count} direct subordinates" if @subordinates.count > 0
    # this is a terrible implementation of this call because every node iterates the entire tree below it, need a better algorithm, maybe consider using @subordinates.count somehow
    # start with -1 to avoid counting self
    downlineCount = countSubordinates -1
    print ", and #{downlineCount} subordinates downline from me" if downlineCount > 0
    print "\n"


    @subordinates.each do |underling|
      underling.rollCall
    end
  end

  def countSubordinates total
    total = total + 1
    @subordinates.each do |underling|
      total = underling.countSubordinates total
    end
    total
  end
end

module CeoRole
  def self.extended (base)
    base.order = "Make money!"
    base.complaint = "I need more resources."

    def to_s
      "the Chief Executive Officer"
    end
  end
end

module CtoRole
  def self.extended (base)
    base.order = "Add new features!"
    base.complaint = "Look at everything we've accomplished!"
  end

  def to_s
    "the Chief Technology Officer"
  end
end

module EngineerRole
  def self.extended (base)
    base.order = nil
    base.complaint = "We're overstuffing the sprints!"
  end

  def to_s
    "an Engineer"
  end
end

module CsoRole
  # Chief Sales Officer
  def self.extended (base)
    base.order = "Make sales!"
    base.complaint = "Sales are up!"
  end
  def to_s
    "the Chief Sales Officer"
  end
end

module SalesRole
  def self.extended (base)
    base.order = nil
    base.complaint = "I've made as many calls as I can!"
  end

  def to_s
    "a Salesperson"
  end
end

def buildBaseOrganization
  organization = BoardOfDirectors.new
  ceo = Employee.new nil, CeoRole
  organization.appointCeo ceo

  ceo.hireEmployee Employee.new nil, CtoRole, "Engineering"

  ceo.hireEmployee Employee.new nil, CsoRole, "Sales"

  organization
end

def run
  organization = buildBaseOrganization

  loop do
    organization.rollCall
    organization.giveOrder

    p "Enter q to quit, anything else to continue"
    input = gets
    if input[0] == "q"
      puts "Final roll call. "
      organization.rollCall
      exit 0
    end
  end
end

run
