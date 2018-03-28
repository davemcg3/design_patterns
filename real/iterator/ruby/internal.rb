class CaesarCipher
  def initialize visigoth=0, caesarshift=3
    @alphabet = ("A".."Z").to_a + (0..9).to_a
    @alphabet += [",", ".", "!", "?", " "]
    @caesarshift = caesarshift
    @visigoth = visigoth # extra shift so Visigoths will never be able to decode our glorious Roman messages! Hail Caesar!
  end

  def encode message
    encoded_message = []
    # iterating over each character in the string but not exposing the internal representation to the client
    message.each_char do |c|
      encoded_message << @alphabet[(@alphabet.index(c.upcase) + @caesarshift + @visigoth) % @alphabet.length]
    end
    encoded_message.join
  end

  def decode message
    decoded_message = []
    # iterating over each character in the string but not exposing the internal representation to the client
    message.each_char do |c|
      decoded_message << @alphabet[(@alphabet.index(c.upcase) - @caesarshift - @visigoth) % @alphabet.length]
    end
    decoded_message.join
  end

  def caesarSecurity? shift
    shift % @alphabet.length == 3
  end
end

# encode for Romans only
encoded = CaesarCipher.new.encode("Et tu, Brute?")

print "Hail Caesar! Welcome to the message encoder. Are you a Visigoth? (y/n)\n> "
input = gets.chomp.downcase
visigoth = input == "n" ? 0 : 1
print "Oh, good! This Caesar Cipher program is only for Romans, not our mortal enemies!\n" if visigoth == 0

# don't cause a stack overflow, but I'm trusting you wouldn't do that to Caesar
print "\nIf you would like extra security enter any whole number. For maximum security like our grand Caesar press Enter.\n> "
shift = gets.chomp.to_i
shift = 3 if shift == 0 # bad inputs are coerced to 0 so let's give the default, er, maximum Caesar security in that case

cipher = CaesarCipher.new visigoth, shift
print "Why do you believe you are deserving of more security than our benevolent Emperor?\n" if (!cipher.caesarSecurity? shift)

print "\nWe have received the following encoded message from our divine leader: #{encoded.to_s}\n"
print "Would you like to decode it? (y/n)\n> "
input = gets.chomp.downcase
if input == "y"
  print "Oh tragedy! Struck down by a friend! " if (visigoth == 0 && shift == 3)
  print "Caesar has said: #{cipher.decode encoded}\n"
end

last_message = ""

loop do
  print "\nPress 1 to encode a message, 2 to decode, or q to quit\n> "
  input = gets.chomp.downcase
  print "\n"

  # exit if the user is done
  if input == "q"
    print "Take care that this secretive cipher falls not into the hands of the dreaded Visigoths! Glory to SPQR!\n\n"
    exit 0
  end

  if input == "1" || input == "2"
    print "Enter message"
    print " or press enter to use last returned message" if last_message != ""
    print "\n> "
    message = gets.chomp
    message = last_message if message == ""
    if message != ""
      last_message = input == "1" ? cipher.encode(message) : cipher.decode(message)
      print "#{last_message}\n"
    end
  end
end
