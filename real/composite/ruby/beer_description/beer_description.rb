Alcohol
 style name brewery, brewery location
under style tasting notes, color, mouth feel, aroma, aroma taste visual

beer advocate has beer reviews
A lot of the necessary information is already there.

    notes / Commercial Description
     color, mouth feel, aroma, taste, visual


ranking {
  id
  beer
  value/rank
}

style {
  id
  style
}

score {
  id
  value
  source (beer advocate, mc, etc.)
  source name (specific name)
  look/color/visual
  smell/aroma
  taste
  [mouth] feel/palate
  overall
}

brewery {
  id
  name
  city
  state
  country
  website
  beers/beer names (id: name hash?)
}

note {
  id
  score
  description
}

review {
  id
  score
  note
  author
  date created
  date last updated
}

beer {
  id
      name
      vintage
      style
      abv (alcohol by volume)
      gravity
      availability
      official note object
      brewery object
      score objects
      aggregated score object
      review objects
      ranking
    }

