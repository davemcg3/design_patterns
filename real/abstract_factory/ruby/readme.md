# "Real" example of the Abstract Factory Design Pattern
Scripts here can be run with `ruby <script>`

I recommend you go through them in this order:
1. cars.rb
2. cars-improved.rb

The problem solved here is allowing users to look up different models of cars from different brands based on a type or class of car.

`cars.rb` is a basic example of how this might be implemented, sticking very closely to the pattern presented in the book.

`cars-improved.rb` is a refactoring of cars.rb to remove as much code duplication as I could. It uses the prototype pattern to create the car factories that get passed into the abstract factory and it has a lookup hash for sending in the type or class of car to the abstract factory which eliminated a case statement with multiple instances of similar calls for the case.
