# we're ignoring the issue with send(:new)
class Board
  private_class_method :new

  # class method
  def self.start
    @board = @board || new
  end

  def initialize
    @word = ["Factory", "Prototype", "Builder", "Abstract", "Singleton", "Adapter", "Bridge", "Composite", "Decorator", "Facade", "Flyweight", "Proxy", "Responsibility", "Command", "Interpreter", "Iterator", "Mediator", "Memento", "Observer", "State", "Strategy", "Template", "Visitor", "Creational", "Structural", "Behavioral"].sample.downcase
    @attempts = 0
    @letters = ""
  end

  def wordLength
    @word.length
  end

  def guess userGuess
    if userGuess.length > 1
      if @word == userGuess
        return ["I think you cheated!\n", true]
      else
        @attempts += 1
        output = "Nope."
        return ["#{output} You suck at this.\n", true] if @attempts == 5
        return ["#{output} Guess again.\n", false]
      end
    else
      if userGuess == "*"
        return ["Weak.\n", true]
      elsif @letters.include? userGuess
        return ["You tried that letter already.\n", false]
      elsif @letters.length > 9
        return ["Enough hints. Guess already.\n", false]
      else
        @letters += userGuess
        subbed = @word.gsub(/[^#{@letters}]/, '-')
        return ["You got it!\n", true] if !subbed.include? '-'
        return ["#{subbed} Guess again.\n", false]
      end
    end
  end
end

def run
  # Uncomment to prove that it works, but it reveals the mystery word at the start
  # Board.new rescue p "You tried new, use start!"
  # p Board.start
  # p Board.start # same object!
  board = Board.start # still the same object!
  print "Word has #{board.wordLength} letters. "
  loop do
    print "Guess a letter or a whole word. * to give up.\n"
    guess = gets.chomp.downcase

    done = board.guess guess
    print done[0]
    break if done[1]
  end
end

run
