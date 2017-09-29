import Builder from '/js/builders/builder.js';
import Storage from '/js/storage.js';

class Editor {
  constructor(site=null, options=null){
    this.builder = new Builder();
    this.storage = new Storage();

    this.args = options;
    if (options !== null) {
      options = options.split("&");
      self = this
      options.forEach(function(element){
        element = element.split("=");
        self[element[0]] = element[1];
      });
    }

    this.site = site;
    this.draw();
    // if (this.site !== null) {
    //   this.loadSite();
    // }

    this.route(this.action);
  }

  route(action) {
    if (action !== undefined){
      this.lastAction = decodeURIComponent(action);
    } else {
      this.lastAction = action;
    }

    if (this.lastAction !== undefined) {
      this.storage.storeItem('lastAction', this.lastAction);
    }

    // //route to action
    // switch(this.lastAction){
    //   case "header":
    //     this.editTextField("header");
    //     break;
    //   case "footer":
    //     this.editTextField("footer");
    //     break;
    //   case "static page":
    //     //this.editTextField("static", "Create");
    //     this.draw();
    //     break;
    //   default:
    // }
    this.draw();
  }

  newWatcher (idToWatch=null, className=null, callback=null, watchedEvent='onclick', valueToPass=null, passedInCollection=null) {
    self = this;
    var collection = null;
    if (idToWatch !== null) {
      collection = [document.getElementById(idToWatch)];
    } else {
      if (passedInCollection === null) {
        collection = Array.from(document.getElementsByClassName(className));
      } else {
        collection = passedInCollection;
      }
    }
    collection.forEach(function (target) {
      // var target = document.getElementById(id + "Button");
      target[watchedEvent] = function (event) {
        if (callback !== null) {
          callback(event, self, target, valueToPass);
        }
      }
    });

    // var observer = new MutationObserver(function(mutations){
    //   mutations.forEach(function(mutation){
    //     console.log(mutation);
    //   });
    // });
    // var config = { attributes: true, characterData: true };
    // observer.observe(target, config);
  }

  watcherCallback (event=null, self=null, id, valueToPass) {
    var value = null;
    switch(valueToPass){
      case "header":
        value = self.builder.buildHeader(document.getElementById(valueToPass).value);
        self.siteJson[valueToPass] = value;
        break;
      case "footer":
        value = self.builder.buildFooter(document.getElementById(valueToPass).value);
        self.siteJson[valueToPass] = value;
        break;
      case "site":
        window.location = "/edit/" + document.getElementById(valueToPass).value + "?" + self.args;
        return true;
        break;
      case "static":
        // console.log('static page: ' + document.getElementById(valueToPass).value);
        self.createStaticPage(document.getElementById(valueToPass).value);
        break;
      case "staticUpdate":
        // if (id.id === "#static_about_newButton") {
        //   console.log(document.getElementById(id.id.replace("Button", "").replace("#", "")).value);
        //   self.siteJson.pages[document.getElementById(id.id.replace("Button", "").replace("#", "")).value] = "";
        // } else {
          let target = id.id.split("_");
          target[2] = target[2].replace("Button", "");
          self.siteJson.pages.forEach(function(page){
            if (page.title.replace("#", "").replace("Button", "") === target[1]) {
              if (target[2] == "new" && page[document.getElementById(id.id.replace("#", "").replace("Button", "")).value] === undefined) {
                page[document.getElementById(id.id.replace("#", "").replace("Button", "")).value] = "";
              } else if (target[2] !== "new") {
                page[target[2]] = document.getElementById(id.id.replace("#", "").replace("Button", "")).value;
              } else {
                console.log('failed to create or update attribute');
              }
            }
          });
        // }
        break;
      default:
    }
    self.draw();
  }

  draw(){
    self = this;

    if (document.getElementById("editorRoot") === null) {
      var editorRoot = document.createElement('div');
      editorRoot.setAttribute("id", "editorRoot");
      editorRoot.setAttribute("class", "container-fluid");
      document.body.append(editorRoot);
    }
    editorRoot = document.getElementById("editorRoot");

    if (!document.getElementById("contentRow")) {
      divContent = document.createElement('div');
      divContent.setAttribute("id", "contentRow");
      divContent.setAttribute("class", "row");
      editorRoot.append(divContent);
    }

    //identify or create a site to load
    if (this.site === null){
      var divContent = document.createElement('div');
      var returned = this.builder.getSite();
      divContent.innerHTML = returned.shift();
      var fieldToWatch = returned.shift();
      editorRoot.append(divContent);
      this.newWatcher(fieldToWatch + "Button", null, this.watcherCallback, 'onclick', fieldToWatch);
    } else {
      //try to load the site details
      if (this.loadSite()) {
        //setup 3 areas: 1) editor menu; 2) content area for forms; 3) site configuration

        //1) editor menu
        if (!document.getElementById("editorMenuCol")) {
          divContent = document.createElement('div');
          divContent.setAttribute("id", "editorMenuCol");
          divContent.setAttribute("class", "col-md-2");
          document.getElementById("contentRow").append(divContent);
        }

        if (!document.getElementById('editorHeading')) {
          divContent = document.createElement('div');
          divContent.setAttribute("id", 'editorHeading');
          divContent.innerHTML = "<h1>Edit " + this.site + "</h1>";
          document.getElementById("editorMenuCol").append(divContent);
        }

        //build left menu
        if (!document.getElementById("editorMenu")) {
          var items = ["header", "footer", "nav", "sidebar", "static page", "dynamic content"];
          var divContent = document.createElement('div');
          divContent.setAttribute("id", "editorMenu");
          divContent.innerHTML = this.builder.buildMenu("/edit/" + this.site + "?action=", items, 'menuLink');
          document.getElementById("editorMenuCol").append(divContent);
          this.newWatcher(null, 'menuLink', this.hijackMenuLinks);

        }

        //2) content area
        if (!document.getElementById("editorContentCol")){
          divContent = document.createElement('div');
          divContent.setAttribute("id", "editorContentCol");
          divContent.setAttribute("class", "col-md-5");
          document.getElementById("contentRow").append(divContent);
        }

        //3) site configuration
        if (!document.getElementById("editorStructureCol")){
          divContent = document.createElement('div');
          divContent.setAttribute("id", "editorStructureCol");
          divContent.setAttribute("class", "col-md-5");
          document.getElementById("contentRow").append(divContent);
        }

        if (divContent = document.getElementById("structure")) {
          divContent.innerHTML = '';
        } else {
          divContent = document.createElement('pre');
          divContent.setAttribute("id", "structure");
        }
        divContent.append(document.createTextNode(JSON.stringify(this.siteJson, null, '  ')));
        document.getElementById("editorStructureCol").append(divContent);

        //fill content area
        if (this.lastAction === undefined || this.lastAction === null){
          this.lastAction = this.storage.getItem('lastAction');
        }
        switch(this.lastAction) {
          case "header":
            this.editTextField("header");
            break;
          case "footer":
            this.editTextField("footer");
            break;
          case "static page":
            this.editTextField("static", "Create");
            divContent = document.createElement('div');
            divContent.setAttribute("id", "editorStaticTabs");
            divContent.innerHTML = this.builder.buildTabs(this.siteJson.pages);
            document.getElementById("editorContentCol").append(divContent);

            let collection = document.getElementById("editorStaticTabs").querySelectorAll(".tab-pane button");
            self.newWatcher(null, null, self.watcherCallback, 'onclick', "staticUpdate", collection);

            //activate first tab, wrap in JQuery for bootstrap
            $(document.getElementById("editorStaticTabs").querySelector("a:first-child")).tab('show');
            break;
          default:
        }

        //persist latest version
        this.storage.storeItem(this.site, JSON.stringify(this.siteJson));
      }
    }
  }

  loadSite(){
    if (this.site !== null) {
      //grab the site structure from storage medium
      if (this.siteJson === undefined) {
        if (this.siteJson = JSON.parse(this.storage.getItem(this.site))) {
          //noop
        } else {
          this.siteJson = {
            header: "<h1>" + this.site + "</h1>"
          }
        }
      }
      return true;
    }
    return false;
  }

  // editHeader(value) {
  //   var divContent = document.createElement('div');
  //   var returned = this.builder.buildInput('header');
  //   divContent.innerHTML = returned.shift();
  //   var fieldToWatch = returned.shift();
  //   // document.getElementById("editorRoot").append(divContent);
  //   document.getElementById("editorContentCol").innerHTML = '';
  //   document.getElementById("editorContentCol").append(divContent);
  //   this.newWatcher(fieldToWatch, this.watcherCallback);
  // }

  editTextField(field, buttonText='Confirm') {
    //strip tags
    var div = document.createElement("div");
    div.innerHTML = this.siteJson[field] || "";
    var strippedValue = div.textContent || div.innerText || "";

    var divContent = document.createElement('div');
    var returned = this.builder.buildInput(field, 'page', strippedValue, buttonText);
    divContent.innerHTML = returned.shift();
    var fieldToWatch = returned.shift();
    // document.getElementById("editorRoot").append(divContent);
    document.getElementById("editorContentCol").innerHTML = '';
    document.getElementById("editorContentCol").append(divContent);
    this.newWatcher(fieldToWatch + "Button", null, this.watcherCallback, 'onclick', fieldToWatch);
  }

  hijackMenuLinks(event, self=null, target=null, valueToPass=null) {
    event.preventDefault();
    target.href.split("?")[1].split("&").forEach(function(element){
      var gets = element.split("=");
      if (gets[0] === 'action') {
        self.route(gets[1]);
        return false;
      }
    });
  }

  createStaticPage(title) {
    var staticPage = {
      "title": title
    };
    if (this.siteJson.pages === undefined){
      this.siteJson.pages = [staticPage];
    } else {
      this.siteJson.pages.push(staticPage);
    }
  }

}
export default Editor;
