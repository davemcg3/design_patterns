import HtmlBuilder from '/js/builders/htmlBuilder.js';

class Builder {
  constructor(){
    this.htmlBuilder = new HtmlBuilder();
  }

  getSite(){
    //id=null, name=null, type='text', value=null, class=null
    var htmlString = "";
    htmlString = this.htmlBuilder.inputRow('site');
    htmlString += this.htmlBuilder.submit('site', 'site', 'Confirm');
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

  buildInput (element, value=null) {
    var htmlString = this.htmlBuilder.inputRow(element, null, null, value);
    htmlString += this.htmlBuilder.submit(element, element, 'Confirm')
    return [htmlString, element];
  }

  buildHeader(element) {
    var htmlString = this.htmlBuilder.buildH1(element);
    return htmlString;
  }

  buildFooter(element) {
    var htmlString = this.htmlBuilder.buildSmall(element);
    return htmlString;
  }
}

export default Builder;
