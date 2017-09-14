# Ruby Implementations of the Factory Method Design Pattern
Scripts here can be run with `ruby <script>`

I recommend you go through them in this order:
1. generic_example: This example most closely follows the Structure on page 108
2. generic_example_extended: This shows how easy it is to add new factories using this pattern
3. abstract_creator: When the core factory doesn't implement all the methods needed to produce widgets, and they _must_ be implemented by factory subclasses
4. concrete_creator: When the core factory does implement all the methods needed to produce default widgets, but they _can_ be overridden by factory subclasses
5. parameterized_creator: The core factory accepts a parameter that tells it which widget to create; factory subclasses not necessary

Of course these are all just thought exercises, and there are lots of different ways to implement them. How would you implement these variations on the pattern in real-world code?
