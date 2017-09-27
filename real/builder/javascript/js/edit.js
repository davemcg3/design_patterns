import Builder from '/js/builders/builder.js';

class Editor {
  constructor(site=null, options=null){
    this.builder = new Builder();

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
  }

  newWatcher (id=null) {
    self = this;
    if (id === null) return;
    var target = document.getElementById(id + "Button");
    target.onclick = function (event) {
      self[id] = document.getElementById(id).value;
      window.location = "edit/" + self.site + "?" + self.args;
    }

    // var observer = new MutationObserver(function(mutations){
    //   mutations.forEach(function(mutation){
    //     console.log(mutation);
    //   });
    // });
    // var config = { attributes: true, characterData: true };
    // observer.observe(target, config);
  }

  draw(){
    if (document.getElementById("editorRoot") === null) {
      var editorRoot = document.createElement('div');
      editorRoot.setAttribute("id", "editorRoot");
      document.body.append(editorRoot);
    }

    if (this.site === null){
      var divContent = document.createElement('div');
      var returned = this.builder.getSite();
      divContent.innerHTML = returned.shift();
      var fieldToWatch = returned.shift();
      editorRoot.append(divContent);
      this.newWatcher(fieldToWatch);
    } else {
      var divContent = document.createElement('div');
      divContent.innerHTML = this.builder.getHeader();
    }
  }
}

export default Editor;
