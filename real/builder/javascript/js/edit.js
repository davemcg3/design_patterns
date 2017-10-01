import Builder from '/js/builders/builder.js';
import Storage from '/js/storage.js';

class Editor {
  constructor(site=null, options=null){
    this.requiredFields = ['content', 'context', 'meta', 'title'];
    this.skippedFields = []; //['context', 'title'] //need a better strategry, looked confusing because you couldn't see some of the root elements, maybe throw a warning if they're changing something that could break things

    this.builder = new Builder(this.skippedFields);
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
      if (callback !== null) {
        target[watchedEvent] = function (event) {
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
        let target = id.id.split("_");
        self.lastPageEdited = target[1];
        self.storage.storeItem('lastPageEdited', self.lastPageEdited);
        target[2] = target[2].replace("Button", "");
        self.siteJson.pages.forEach(function(page){
          // if we're on the right page
          if (page.title.replace("#", "").replace("Button", "") === target[1]) {

            // if we're adding a new attribute
            if (target[2] == "new" && page[document.getElementById(id.id.replace("#", "").replace("Button", "")).value] === undefined) {
              page[document.getElementById(id.id.replace("#", "").replace("Button", "")).value] = "";

            // if we're removing a page
            } else if (target[2] !== undefined && target[2].replace("Button", "") === "remove") {
              if (page.title === target[1]) {
                let pagesRebuild = [];
                self.siteJson.pages.forEach(function(deleteablePage){
                  if (deleteablePage.title !== page.title){
                    pagesRebuild.push(deleteablePage);
                  }
                });
                self.siteJson.pages = pagesRebuild;
              }

            // if we're removing an attribute
          } else if (target[target.length-1] !== undefined && target[target.length-1].replace("Button", "") === "remove") {
              self.removeAttribute(self, page, target, 2);

            // if we're updating an element
            } else if (target[2] !== "new") {
              self.updateAttribute(page, target, 2, id);

            // probably shoulldn't be here, might not be able to get here
            } else {
              console.log('failed to create or update attribute');
            }
          }
        });
        break;
      default:
    }
    self.draw();
  }

  updateAttribute(page, target, targetPointer=2, id) {
    if (typeof(page[target[targetPointer].replace("Button", "")]) === "object") {
      self.updateAttribute(page[target[targetPointer]], target, ++targetPointer, id)
    } else {
      // can't set the title attribute to blank
      if (
        (
          document.getElementById(id.id.replace("#", "").replace("Button", "")).value === ""
          &&
          (target[targetPointer] !== 'title')
        )
        ||
        document.getElementById(id.id.replace("#", "").replace("Button", "")).value !== ""
      )
      {
        try {
          // try to convert to a JSON object first
          page[target[targetPointer].replace("Button", "")] = JSON.parse(document.getElementById(id.id.replace("#", "").replace("Button", "")).value);
        } catch (e) {
          // if it won't convert to a JSON object it's either malformed JSON or just a regular string so set it directly
            page[target[targetPointer].replace("Button", "")] = document.getElementById(id.id.replace("#", "").replace("Button", "")).value;
        }
      } else {
        console.log('Cannot perform action that would make content unreachable.');
      }

    }
  }

  removeAttribute(self, page, target, targetPointer=2){
    if (typeof(page[target[targetPointer]]) === "object") {
      self.removeAttribute(self, page[target[targetPointer]], target, ++targetPointer);
    } else {
      if (!self.requiredFields.includes(target[targetPointer])) {
        delete (page[target[targetPointer]]);
      } else {
        console.log("Cannot remove required field.");
      }
    }
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
            divContent.innerHTML = this.builder.buildTabs(this.siteJson.pages) || 'Create a page!';
            document.getElementById("editorContentCol").append(divContent);
            //$("[data-recursion]").filter(function(){ return $(this).data("recursion") > 0; }).css('background-color', 'red');
            var recursionList = [];
            document.querySelectorAll("[data-recursion]").forEach(function(element){
              if (element.getAttribute("data-recursion") > 0) {
                recursionList.push(element);
              }
            });
            recursionList.forEach(function(element){
              if (element.style["margin-left"] === "") {
                element.style["margin-left"] = (element.getAttribute("data-recursion") * 2) + "em";
                element.style["border-left"] = "1px solid #00b";
              } else {
                element.style["margin-left"] = (element.getAttribute("data-recursion") * 2) + "em";
                element.style["border-left"] = "1px solid #00b";
              }

            });
            let collection = document.getElementById("editorStaticTabs").querySelectorAll(".tab-pane button");
            self.newWatcher(null, null, self.watcherCallback, 'onclick', "staticUpdate", collection);

            //activate first tab, wrap in JQuery for bootstrap
            var querySelector = "a:first-child";
            if (self.lastPageEdited !== undefined) {
              querySelector = "a[href$=" + self.lastPageEdited + "]";
            } else if (this.storage.getItem('lastPageEdited') !== null) {
              querySelector = "a[href$=" + this.storage.getItem('lastPageEdited') + "]";
            }
            $(document.getElementById("editorStaticTabs").querySelector(querySelector)).tab('show');
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
    divContent.setAttribute("class", "form");
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
      "title": title,
      "context": title,
      "content": "",
      "meta": {
        "title": title + "_meta",
        "status": "active",
        "visibility": "public",
        "context": title + "_meta"
      }
    };
    if (this.siteJson.pages === undefined){
      this.siteJson.pages = [staticPage];
    } else {
      this.siteJson.pages.push(staticPage);
    }
  }

}
export default Editor;
