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
    htmlString = this.htmlBuilder.buildUl(anchors);
    return htmlString;
  }

  buildInput (id, name=null, value=null, buttonText=null) {
    var htmlString = this.htmlBuilder.inputRow(id, name, null, value);
    htmlString += this.htmlBuilder.submit(id, name, buttonText)
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
      paneContent.push(self.buildInput("#static_" + page.title.replace(' ', '') + "_" + "new", 'new attribute', null, 'Create').shift());
      for (var [key, value] of Object.entries(page)) {
        paneContent.push(self.buildInput("#static_" + page.title.replace(' ', '') + "_" + key, key, value, 'Update').shift());
      }
      panes.push(self.htmlBuilder.buildWrapper(paneContent.join("\n"), "tabpanel", "tab-pane fade", "static" + page.title.replace(' ', '')));
    });

    var ul = this.htmlBuilder.buildUl(nav, "nav nav-tabs", "tablist", null, "presentation");
    var tabPanes = this.htmlBuilder.buildWrapper(panes.join("\n"), null, "tab-content");
    var tabContent = ul + tabPanes;
    var htmlString = this.htmlBuilder.buildWrapper(tabContent);
    return htmlString;

  }
}

export default Builder;
