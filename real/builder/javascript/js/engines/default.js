import Engine from '/js/engines/engine.js'

class DefaultEngine extends Engine {
  constructor(site){
    super();
    this.site = site;
    if (document.getElementById("viewerRoot") === null) {
      var viewerRoot = document.createElement('div');
      viewerRoot.setAttribute("id", "viewerRoot");
      viewerRoot.setAttribute("class", "container");
      document.body.append(viewerRoot);
    }
    this.viewerRoot = document.getElementById("viewerRoot");
  }

  output(json){
    //console.log("(" + typeof(json) + ") " + json);
    switch(typeof(json)){
      case "string":
        var row = document.createElement('div');
        row.setAttribute("class", "row");
        var htmlString = document.createElement('div');
        htmlString.setAttribute("class", "col-md-12");
        htmlString.innerHTML = json;
        row.append(htmlString);
        this.viewerRoot.append(row);
        break;
      // case "object":
      //   json.forEach(function(element){
      //     console.log('object element');
      //     console.log(element);
      //   });
      //   break;
      default:
        //don't know what this is, do nothing
    }
  }

  outputContentRow(){
    var htmlString = document.createElement('div');
    htmlString.setAttribute("id", "contentRow");
    htmlString.setAttribute("class", "row");
    this.viewerRoot.append(htmlString);
  }

  outputHeader(json){
    this.output(json);
  }

  outputNav(json, width){
    var self = this;
    var htmlString = document.createElement('div');
    htmlString.setAttribute("class", "col-md-" + width);

var hereDoc = `
<ul class="nav nav-pills nav-stacked">
`;
json.forEach(function(link){
  hereDoc += "<li><a href=\"/view/" + self.site + "/" + link.link + "\">" + link.value + "</a></li>";
});
hereDoc += `
</ul>
`;
    htmlString.innerHTML = hereDoc;
    document.getElementById('contentRow').append(htmlString);
  }

  outputContent(json, width, thisPage){
    var self = this;
    var htmlString = document.createElement('div');
    htmlString.setAttribute("class", "col-md-" + width);
    var counter = 0;
    var firstPageHTML = '';
    json.forEach(function(page){
      if (counter++ === 0) {
        firstPageHTML = page.content;
      }
      if (page.title === thisPage){
        // need to check meta data and visibility, etc. Not implemented yet.
        htmlString.innerHTML = page.content;
      }
    });
    if (htmlString.innerHTML === '') {
      htmlString.innerHTML = firstPageHTML;
    }
    document.getElementById('contentRow').append(htmlString);
  }

  outputSidebar(json){
    this.output(json);
  }

  outputFooter(json){
    this.output(json);
  }
}
export default DefaultEngine;
