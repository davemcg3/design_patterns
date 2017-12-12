# Facade Pattern

Implemented the facade pattern to hide a "complex" subsystem for selecting which ad to show. The client simply has to instantiate the facade and then call the `getAd`  method.

# Subsystem Explanation
## Registry
In the background the registry instantiates the ad networks and selects a decision method to rotate among them. I versioned the different implementations of the `getAd` method to show how they were refactored for simplicity. All 4 still work so you can change the version in the `getAd` method and rerun.

## Rotation Strategy
It would be easy to add new decision methods, for example a weighted average implementation, but creating a new subclass that extends AbstractAdRotationStrategy and adding a new case statement to the registry initializer and a new test case to the run method.

## Ad Displayer
The AdDisplayer simply shows an ad from the selected network. On failure it provides an ad-free experience but that could be switched out to a "known" network if desired. Initially this class was instantiated but later versions were refactored to use a class method instead for memory consumption reduction.

## Ad Networks
The ad networks are stored as singletons through the AbstractAd definition and a count of how many times each network shows an ad is maintained. There are class methods for showing how many networks have been instantiated and to provide access to those networks. In a production implementation the show method for each network would return an actual ad.

# Execution
run with `ruby adpicker.rb`
