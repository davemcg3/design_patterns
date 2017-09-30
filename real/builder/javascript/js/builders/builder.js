import HtmlBuilder from '/js/builders/htmlBuilder.js';

class Builder {
  constructor(){
    this.htmlBuilder = new HtmlBuilder();
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

  buildInput (id, name=null, value=null, buttonText=null, deleteButton=false) {
    var htmlString = this.htmlBuilder.inputRow(id, name, null, value);
    htmlString += this.htmlBuilder.submit(id, name, buttonText)
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

  buildTabs(content) {
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
        value.title = page.title + '_' + key;
        // we must go deeper!
        self.buildFieldEditor(self, value, paneContent, recursionLevel + 1);
      } else {
        // time for a kick
        paneContent.push(self.htmlBuilder.buildWrapper(self.buildInput("#static_" + page.title.replace(' ', '') + "_" + key, key, value, 'Update', 'Remove').shift(),null,'form', null, recursionLevel));
      }
    }

  }
}

export default Builder;
