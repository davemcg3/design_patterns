# Memento
Quick rundown of what I would like to build for this:
Rails app with a simple structure:
```  /app
    /controllers
      /api
        save data (maybe a session)
        get data (when passed a session to restore)
      / (displays React SPA)
    /models
      data < ActiveRecord
    /views
      /api
        data.json
      / (React front-end app)
```
The front-end React app will have a history with an index of all previous sessions, and an input to create a new session. If you click on one of the previous sessions the data will be loaded up. Meta data might include something like: originating site, status of that data (submitted, processed, deleted, etc.). Would need a way to manually set that meta data for each session through the interface. The data in JSON format is the memento that is getting passed around, with the db being the caretaker maybe? Kind of a stretch... but it's a stretch where you can actually touch your toes.
