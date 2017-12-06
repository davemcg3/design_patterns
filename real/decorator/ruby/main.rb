require './post'
require './features'

@post = Post.new
p @post

@editablePost = Editable.new @post
@editablePost.editPost "I am an edited post"
p @editablePost

@authorablePost = Authorable.new @editablePost
@authorablePost.authorable 'Dave'
p @authorablePost

@publishablePost = Publishable.new @authorablePost
p @publishablePost

print "\n", "Publishing post", "\n"
@publishablePost.publish
p @publishablePost

print "\n", "Overview:", "\n"
p @publishablePost.message
p "authored by #{@publishablePost.author}"
print "published? #{@publishablePost.published?}"
print ", published at #{@publishablePost.published_at}" if @publishablePost.published?
print "\n"

