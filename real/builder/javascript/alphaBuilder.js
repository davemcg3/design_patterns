export default {
  "header": "<h1>alphaBuilder</h1>",
  "nav": [
    {
      "link": "overview",
      "value": "overview",
      "klass": "",
      "position": ""
    },
    {
      "link": "viewer",
      "value": "viewer",
      "klass": "",
      "position": ""
    },
    {
      "link": "editor",
      "value": "editor",
      "klass": "",
      "position": ""
    },
    {
      "link": "builders",
      "value": "builders",
      "klass": "",
      "position": ""
    }
  ],
  "pages": [
    {
      "title": "overview",
      "context": "overview",
      "content": "<h1>AlphaBuilder Overview</h1> <h2>AlphaBuilder is a simple website builder</h2>  <p><img src=\"http://unimpossible.co.uk/wp-content/uploads/2016/12/poc.png\" style=\"height: 200px; margin-right: 20px;\" align=\"left\" alt=\"Graphic depicting Proof of Concept text\">This is a proof of concept website builder. The idea is that non-technical people can use it to build simple websites that don't need much configuration, for example, small businesses that need a web presence because they want to be found by members of the local community but don't need to sell anything online can build a simple site (even just a single page site!) to allow people to find them and get their contact information. They can use the application to build out a new site and then point DNS to it have a simple website online! Since we eat our own dog food this site was built in alphaBuilder, so it's a working concept!</p>  <p>Obviously there are a lot of features that weren't added that would need to be in order for this to be a useful website generator, but this is at least a first attempt at building an app like this.</p>  <p>For example, we need:</p> <ul>   <li>A better editor for the content fields</li>   <li>Perhaps use markdown for building content, thought at that point it might be too technical for some users</li>   <li>Hide the confusing meta fields and only show them when requested</li>   <li>Easier ways to add new tags, like image tags or headlines</li>   <li>More layout engines</li>   <li>Dynamic content, like blog posts</li>   <li>Implementing some of the navigation configuration items, like moving things up and down the list</li>   <li>Allowing navigation items to be added that aren't auto-configured, like links to external pages</li>   <li>Sub-menus</li>   <li>A login system to restrict access to editing pages</li>   <li>The list goes on and on and on...</li> </ul>  <p><img src=\"https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg\" style=\"height: 200px; margin-left: 20px;\" align=\"right\" alt=\"Book cover image\">This project flowed from working with the <a href=\"https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8\">Design Patterns book</a> by the Gang of Four, specifically working on implementing the Builder and Composite patterns. You can view more information about how these patterns were implemented in this project by checking out <a href=\"/view/alphaBuilder/builders\">the builders page</a> here.</p>  <p>The application was built in ES6 JavaScript (mostly) with just a touch of JQuery where required by the Bootstrap framework. The idea is that the application itself could be released under a permissive license, like the MIT license, so that anyone could take the application itself, build a site, and then point DNS at it and have a working website. Obviously some non-technical users might have difficulty figuring out the complexities of the DNS system, so a future addition could be adding an API hook that would synchronize what they build with a service so that the pages they build could be stored on a server that is properly setup and served from there. This would of course set up the need for a fee for hosting and configuration, but a future addition to that system could allow them to easily purchase and point a custom domain at the remote site and have their own domain if the hoster setup a partnership with a domain seller.</p>  <p>Other future additions that might be neat include:</p> <ul>   <li>AB testing built in</li>   <li>Landing pages</li>   <li>Analytics</li>   <li>Link shortening service integration with dashboard reporting</li>   <li>Better dashboards and screens for the back-end</li>   <li>And all kinds of other awesome things that could exist...</li> </ul> <p>The application would need a refactor because there are a host of places where I made architectural mistakes and places that could be tightened up, but really the smarter way to do this would be to step away from building from scratch and rewrite using a standard framework, like React or Vue.js, to really take advantage of all the things offered by those ecosystems. Why reinvent the wheel if someone has already made a better one than you're going to make? </p>",
      "meta": {
        "status": "active",
        "visibility": "public",
        "context": "overview_meta",
        "title": "overview_meta"
      }
    },
    {
      "title": "viewer",
      "context": "viewer",
      "content": "<h1>Viewer</h1> <p><img src=\"https://images-na.ssl-images-amazon.com/images/I/81d7Ht1H51L._SX355_.jpg\" style=\"height: 200px; margin-left: 20px;\" align=\"right\" alt=\"Photo of a slide viewer toy\">The main functionality of the application is split into 2 parts: viewing and editing. Viewing is the default mode and in the current build is the simpler of the 2 parts, but that's mostly an architectural error, which I'll discuss below.</p>  <h2>Current Functionality</h2> <ol>   <li>Load Site Configuration</li>   <li>Set up the layout builder</li>   <li>Instruct the layout builder to output the site</li> </ol> <p>On instantiation the layout builder loads in a layout engine that is supposed to control the actual layout of the site. The builder then tells the engine to layout each individual element of the site in the order the builder wants the site laid out. This is probably something that should be controlled by the engine instead of the builder, but at that point we might be deviating from the pattern into a full abstract factory pattern for the layout engine.</p>  <p>Currently there is only one layout engine, and it controls nearly nothing because of a design mistake early on in the project, which would be fixed by a refactor. The layout engine inherits from an abstract engine class that defines the methods an engine should contain. Over time I would expect these to change (increase) as more functionality is required by various users, but for now it's a simple header, nav, content, sidebar, and footer, except the sidebar functionality isn't actually implemented in the edit side yet. It seemed superfluous for the proof of concept but would be important enough to the final build that it would be added before release. The concrete engine implementation accepts the various JSON parameters and then outputs HTML based on the input. For the nav it actually builds the output, but for the rest of the elements the html is being stored in the JSON configuration so it merely outputs the stored HTML. This is the biggest design error made. The edit function should be storing configuration information and content for the fields and the layout engine should be able to read the configuration and content and build an output that is appropriate for the engine, instead of having the edit piece tell it what the output should look like.</p>  <h2>Intended (or future) Functionality</h2> <ol>   <li>Load Site Configuration</li>   <li>Set up the layout builder</li>   <li>Instruct the layout builder to output the site</li> </ol> <p>The layout builder should instantiate the engine and pass it the configuration information for the site. The layout engine should then parse the configuration and use an HTML Builder to output the appropriate HTML content for the layout based on the configuration data present. It's entirely possible that the layout builder isn't required at all and the functionality there can move up to the Viewer class itself.",
      "meta": {
        "status": "active",
        "visibility": "public",
        "context": "viewer_meta",
        "title": "viewer_meta"
      }
    },
    {
      "title": "editor",
      "context": "editor",
      "content": "<h1>Editor</h1> <p><img src=\"http://youngtopublishing.com/wp-content/uploads/2014/08/stockimage_editor.jpg\" style=\"height: 200px; margin-left: 20px;\" align=\"right\" alt=\"Picture of a pencil pointing to a dictionary definition of the word 'editor.'\">The editor currently does the brunt of the work. On instantiation it does a few things like try to load a site configuration and set some useful variables, and then it eventually moves into the draw function, which is our primary function, though probably misnamed. The draw function lays out our editor, based on the recently (as of 2017) redesigned JIRA look and feel. It uses 3 columns: </p> <ol>   <li>The left column is the editor menu, used to move around the editor itself</li>   <li>The middle column is the configuration column where we actually make all of our changes</li>   <li>The right column is the previewer, which loads a site preview in the upper 60% of the column and a preview of the JSON configuration in the bottom 40%</li> </ol> <p>When creating attributes or field the editor uses a builder object that knows how to structure the various fields, and then the builder object uses an html builder object that knows how to output actual HTML. There's a little bit of each of these at every level of this process so a refactor would help to isolate the code into its correct object, and the builder object here should just be building out the JSON configuration and the viewer object's layout engine should be using the HTMLBuilder object to output the actual HTML we are interested in, but that's just a refactor away. There's quite a bit of manipulation happening in the editor object, so it makes an intersting (even if currently sloppy) read for those interested.</p>",
      "meta": {
        "status": "active",
        "visibility": "public",
        "context": "editor_meta",
        "title": "editor_meta"
      }
    },
    {
      "title": "builders",
      "context": "builders",
      "content": "<h1>The Builders</h1> <p><img src=\"http://www.aimbooks.com.au/wp-content/uploads/2015/06/Builder-211x300.jpg\" style=\"height: 300px; margin-right: 20px;\" align=\"left\" alt=\"Drawing of a construction worker holding a giant hammer\">Ahh, the Builders, the core of why this was built. To gain experience using the builder pattern I needed to build a project where pieces of the project could build other pieces. One of my favorite things to build is a website builder because I think everyone should be able to have a web page, even if they don't have the knowledge on how to code or debug any of the languages used to build them. I also wanted to touch on the Composite pattern as that is often a product of the Builders, and I wanted this example to be no exception. So, here, our composite object is the JSON configuration that the Builders output.</p>  <p>There are currently 3 builders in this application, though that number is apt to change as refactors happen. The first builder I constructed was the builder used by the editor to build the various pieces of the configuration. It has methods on it like buildHeader, buildNav, and buildFooter. These functions know how to construct the larger element of the system, and they call the second builder, the HTML Builder, to build the pieces of HTML as required. Each method in the Builder might call multiple methods in the HTML Builder to assemble all the required components of the larger element. The third builder is the layout builder, and I realized too late that the layout builder should be the one calling the HTML builder to build the HTML at view time instead of building it at edit time. This would allow different layout engines to build the components differently and give us different layouts utilizing the same JSON configuration.  Work for another day. The Layout Builder does still have one important piece of information that it controls: the order that the components are laid out. It tells the Layout Engine which order to output the pieces so that we get a cohesive site at viewing.</p>  <p>Overall this was an excellent project to learn about using the builder pattern to build composite objects, and this probably isn't the last time I'll work on a simple website builder!</p>",
      "meta": {
        "status": "active",
        "visibility": "public",
        "context": "builders_meta",
        "title": "builders_meta"
      }
    }
  ],
  "footer": "<footer><small><a href=\"/edit/alphaBuilder\">Edit</a></small></footer>"
}
