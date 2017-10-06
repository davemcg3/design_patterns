# import classes
require './score'
require './style'
require './brewery'
require './note' #depends on score
require './review' #depends on score, note
require './beer' #depends on style, note, brewery, score, review
require './ranking' #depends on beer
require 'json'

# initialize variables so our objects don't get garbage collected
styles = []
breweries = []
scores = []
notes = []
reviews = []
rankings = []
beers = []

def getObject(list, listProperty, klass, data, dataProperty)
  found = nil
  listCount = 0
  # if it's in the list return that one
  list.each do |obj|
    # print obj.public_send(listProperty), "===", data[dataProperty], "? ", (obj.public_send(listProperty) === data[dataProperty]), "\n"
    if obj.public_send(listProperty) === data[dataProperty]
      listCount += 1
      found=obj
      break
    end
  end

  # if it's not in the list add a new one to the list and return it
  if listCount == 0
    found = klass.new(data)
    list << found
  end

  return list, found
end

# could probably refactor out into a generic getComposite method
def getReviews(seed, scores, notes, reviews)
  found = []
  seed.each do |review|
    # build our review object

    # 1. build the scores, cheating it because I know my source_specifics are unique, but I should be testing all the fields
    #scores, thisScore = getObject(scores, "source_specific", Score, review["note"]["score"], "source_specific")
    thisScore = Score.new({source_general: review["note"]["score"]["source_general"], source_specific: review["note"]["score"]["source_specific"], color: review["note"]["score"]["color"], aroma: review["note"]["score"]["aroma"], taste: review["note"]["score"]["taste"], palate: review["note"]["score"]["palate"], overall: review["note"]["score"]["overall"]})
    scores << thisScore
    # p thisScore

    # each note has: score, description
    # 2. build the notes
    thisNote = Note.new({score: thisScore, description: review["note"]["description"]}) # keys get symbolized because ruby hash instead of JSON object
    notes << thisNote
    # p thisNote

    # 3. build the review
    # each review has: note, author
    thisReview = Review.new({note: thisNote, author: review["author"]})
    reviews << thisReview
    # p thisReview

    found << thisReview
  end

  return scores, notes, reviews, found
end

# load seeds
seeds = JSON.parse(File.read("seeds.json"))
seeds.each do |seed|

  # 1. Gather info
  # 1a. Style
  styles, thisStyle = getObject(styles, "style", Style, seed["style"], "style")
  # p thisStyle

  # 1b. Brewery
  breweries, thisBrewery = getObject(breweries, "name", Brewery, seed["brewery"], "name")
  # p thisBrewery

  # 1c. Score
  scores, thisScore = getObject(scores, "overall", Score, seed["score"], "overall") # this only works because my limited seed set doesn't duplicate an overall score
  # should probably check if all fields match instead
  # p thisScore

  # 1d. Reviews, possibly multiple, each a composite
  scores, notes, reviews, theseReviews = getReviews(seed["reviews"], scores, notes, reviews)
  # p theseReviews

  # 1e. Ranking
  thisRanking = Ranking.new seed["ranking"]["rank"]
  rankings << thisRanking
  # p thisRanking

  # build beer
  # name=nil, vintage=nil, style_id=nil, abv=nil, gravity=nil, availability=nil, brewery_id=nil, score_id=nil, reviews=nil, ranking=nil, description=nil
  thisBeer = Beer.new({name: seed["name"], vintage: seed["vintage"], style: thisStyle, abv: seed["abv"], gravity: seed["gravity"], availability: seed["availability"], brewery: thisBrewery, score: thisScore, reviews: theseReviews, ranking: thisRanking, description: seed["description"]})
  beers << thisBeer
  # p thisBeer
end

# print "\n\n", styles, "\n\n", breweries, "\n\n", scores, "\n\n", notes, "\n\n", rankings, "\n\n", beers, "\n\n"

# handle input
def handleInput input, beers
  response = []
  # p input
  splitInput = input.split("" )
  # p splitInput
  splitInput.each do |searchTerm|
    beers.each do |beer|
      if beer.name.downcase.include? searchTerm
        response.push beer
      end
    end
  end

  builtResponse = ""
  response.each do |beer|
    builtResponse += beer.output
  end

  if builtResponse != ""
    print builtResponse, "\n\n"
  else
    print "Sorry, don't know about that one.\n\n"
  end
end

# get input
print "Welcome to the Beer-Getter-Informationer. Want a pint? Of course you do.  "
loop do
  print "What beer do you want information on? Type 'quit' to quit.\n"
  input = gets.chomp.downcase
  print "\n"

  # handle unexpected input
  # if input.nil?
  #   p "I don't know what that means."
  #   next
  # end

  # exit if the user is done
  if input == "quit"
    print "<hiccup> Thanks for the drinks mate!\n"
    exit 0
  end

  handleInput input, beers
end

# fin
