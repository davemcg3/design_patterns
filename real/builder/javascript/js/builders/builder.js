import HtmlBuilder from '/js/builders/htmlBuilder.js';

class Builder {
  constructor(skippedFields=null){
    this.htmlBuilder = new HtmlBuilder();
    this.skippedFields = skippedFields;
  }

  getSite(){
    //id=null, name=null, type='text', value=null, class=null
    var htmlString = "";
    htmlString = this.htmlBuilder.inputRow('site');
    htmlString += this.htmlBuilder.submit('site', 'site', 'Create');
    return [htmlString, 'site'];
  }

  buildMenu(prepend, items, anchorClass=null){
    self = this;
    var anchors = [];
    items.forEach(function (element) {
      anchors.push(self.htmlBuilder.buildAnchor(prepend + element, element, anchorClass));
    });
    var htmlString = "";
    //buildUl(elements, ulClass=null, ulRole=null, liClass=null, liRole=null)
    htmlString = this.htmlBuilder.buildUl(anchors, "nav nav-pills nav-stacked");
    return htmlString;
  }

  buildInput (id, name=null, value=null, buttonText=null, deleteButton=false, buttonClass=null) {
    var htmlString = this.htmlBuilder.inputRow(id, name, null, value);
    htmlString += this.htmlBuilder.submit(id, name, buttonText, buttonClass);
    if (deleteButton) htmlString += this.htmlBuilder.submit(id + '_' + deleteButton.toLowerCase(), name, deleteButton)
    return [htmlString, id];
  }

  buildHeader(element) {
    var htmlString = this.htmlBuilder.buildH1(element);
    return htmlString;
  }

  buildFooter(element) {
    var htmlString = this.htmlBuilder.buildSmall(element);
    return htmlString;
  }

  buildNav(structure=null) {
    if (structure === null) return null;
    var expected = this.buildExpectedNav(structure);
    var options = this.checkNavOptions(structure.nav);
    return this.buildThisNav(expected, options)
  }

  buildExpectedNav(structure=null) {
    if (structure === null) return null;
    var self = this;
    var returned = [];
    if (structure.pages !== undefined) {
      // add static pages
      structure.pages.forEach(function(element) {
        returned.push(element.title);
      });
      // add dynamic content
      // not implemented yet!
    }
    return returned;
  }

  checkNavOptions(preexistingNav=null) {
    // {
    //   link: "",
    //   value: "",
    //   klass: "",
    //   position: ""
    // }
    if (preexistingNav === null) return null;
    var self = this;
    var returned = preexistingNav;
    // not entirely sure what I want to do in here yet, but I'm sure something should be happening
    // I suspect I'll need to pass in the expected nav as well and then check each element of that against the set options in the preexistingNav and make any necessary adjustments
    // so, noop for now
    return returned;
  }

  buildThisNav(expected, options) {
    if (expected === null) return null;
    // [{
    //   link: "",
    //   value: "",
    //   klass: "",
    //   position: ""
    // }]
    var self = this;
    var returned = [];
    expected.forEach(function(element){
      returned.push({"link": element, "value": element, "klass": "", "position": ""})
    });
    return returned;
  }

  buildTabs(content) {
    if (content === undefined) {
      return;
    }
    var self = this;
    var nav = [];
    var panes = [];
    content.forEach(function(page) {
      nav.push(self.htmlBuilder.buildAnchor("#static" + page.title.replace(' ', ''), page.title, null, "static" + page.title.replace(' ', ''), "tab", "tab"));
      let paneContent = [];
      paneContent.push(self.htmlBuilder.submit("static_" + page.title.replace(' ', '') + '_remove',null,'Delete Page'));
      paneContent.push(self.htmlBuilder.buildWrapper(self.buildInput("#static_" + page.title.replace(' ', '') + "_" + "new", 'new attribute', null, 'Create', null).shift(),null,'form'));
      self.buildFieldEditor(self, page, paneContent);
      panes.push(self.htmlBuilder.buildWrapper(paneContent.join("\n"), "tabpanel", "tab-pane fade", "static" + page.title.replace(' ', '')));
    });

    var ul = this.htmlBuilder.buildUl(nav, "nav nav-tabs", "tablist", null, "presentation");
    var tabPanes = this.htmlBuilder.buildWrapper(panes.join("\n"), null, "tab-content");
    var tabContent = ul + tabPanes;
    var htmlString = this.htmlBuilder.buildWrapper(tabContent);
    return htmlString;

  }

  // because recurion is a beautiful creature
  buildFieldEditor(self, page, paneContent, recursionLevel=0) {
    for (var [key, value] of Object.entries(page)) {
      if (typeof(value) === "object") {
        // because recursion is a violent creature
        //TODO: Only set if not already set
        value.context = page.title + '_' + key;
        // we must go deeper!
        self.buildFieldEditor(self, value, paneContent, recursionLevel + 1);
      } else {
        // time for a kick
        if (!this.skippedFields.includes(key)){
          paneContent.push(self.htmlBuilder.buildWrapper(self.htmlBuilder.label(null, page.context.split("_").join(" > ")) + self.buildInput("#static_" + page.title.replace(' ', '') + "_" + key, key, value, 'Update', 'Remove').shift(),null,'form', null, recursionLevel));
          // I probably should be returning the value and pushing from the calling function, but it's easier to pass in the reference and push the component from here. Maybe something to look at on a refactor.
        }
      }
    }

  }
}

export default Builder;
