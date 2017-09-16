#Factory Method Implementation

We use the factory method to generate the red boxes (rats in the code) that the player has to jump over.

Controls:
* Up arrow -> jump
* Escape -> pause
* Reload page to start a new game

_Note: Because of a CORS issue with ES6 we have to actually serve the files instead of just opening them in a local browser so I added Docker and Docker-Compose files. Install Docker and you should be able to run a server with `docker-compose up` and then visit `http://localhost` in your browser, unless you're already running a docker server on port 80, at which point you should know enough to troubleshoot that yourself with Google and Stack Overflow._
