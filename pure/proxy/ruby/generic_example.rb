class AbstractSubject
  def request
    raise "Not Implemented"
  end
end

class RealSubject < AbstractSubject
  def request
    "Request received, this is the response."
  end
end

class Proxy < AbstractSubject
  def initialize realsubject=nil
    if realsubject.instance_of? RealSubject
      @realsubject = realsubject
    else
      @realsubject = RealSubject.new
    end
  end

  def request
    @realsubject.request
  end
end

class Client
  def makeRequest
    p Proxy.new.request
  end
end

Client.new.makeRequest
