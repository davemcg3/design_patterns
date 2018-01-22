# Our protected object
class Employee
  # splats explanation, simpler than I expected:
  # https://blog.honeybadger.io/ruby-splat-array-manipulation-destructuring/
  def initialize **attributes
    attributes.each do |key, value|

      # Dynamically assign any passed attributes
      # create the attr_accessor
      # https://stackoverflow.com/a/1735001
      class <<self
        self
      end.class_eval do
        attr_accessor key
      end
      # assign the attribute
      send("#{key}=",value)
    end
  end
end


# Our Proxy Object, used to access our protected object
class EmployeeDataAccessor
  # Visible attributes per department
  TRAINING = [:callsign, :title, :flight_hours]
  HR = [:callsign, :title, :salary]
  OPS = [:callsign, :title]

  def initialize department=nil
    # Would probably use some sort of mapper or lookup value here, but I'll
    # cheat it and correctly use the department name constant without validation
    # because I have it right here and this is a demo
    @department = department
    return "Must belong to department" unless validate_department

    # sample employees, these would normally be set through an onboarding process (not built here)
    @employees = []
    @employees[0] = Employee.new callsign: "Goose", title: "Pilot", salary: "$100", flight_hours: 400
    # @employees[1] = Employee.new callsign: "Maverick", title: "Pilot", salary: "$120", flight_hours: 400
  end

  def getEmployeeData employee_callsign
    return "Must belong to department" unless validate_department

    response = {}

    # find the protected employee data
    found = @employees.select { |employee| employee.callsign == employee_callsign }.last
    return "Employee not found" if found.nil?

    # get the attributes this department is allowed to access
    self.class.const_get(@department).each do |attr|
      response[attr] = found.send("#{attr}")
    end

    # could write another method to format the response if needed
    response
  end

  def validate_department
    # whitelist valid departments by checking if the constant exists
    begin
      return true if self.class.const_get(@department)
    rescue
      # noop
    end
    false
  end
end

def run
  # A full implementation would have a more robust mechanism for determining
  # that the current user was a member of the given department and the protection
  # mechanism would be a little more difficult to get around, but for demonstration
  # purposes this works

  # We could also build a singleton object then pass in the requesting
  # department on the call and allow the single object to do the work. It's a
  # less resource-intensive pattern, but it could be a chokepoint in a large
  # organization with many valid requests or one subject to a DDOS attack
  training_eda = EmployeeDataAccessor.new :TRAINING
  p training_eda.getEmployeeData "Goose"

  hr_eda = EmployeeDataAccessor.new :HR
  p hr_eda.getEmployeeData "Goose"

  ops_eda = EmployeeDataAccessor.new :OPS
  p ops_eda.getEmployeeData "Goose"
end

run
