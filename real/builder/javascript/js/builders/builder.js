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

  buildMenu(prepend, items){
    self = this;
    var anchors = [];
    items.forEach(function (element) {
      anchors.push(self.htmlBuilder.buildAnchor(prepend + element, element));
    });
    var htmlString = "";
    htmlString = this.htmlBuilder.buildUl(anchors);
    return htmlString;
  }

  buildInput (element) {
    var htmlString = this.htmlBuilder.inputRow('header');
    htmlString += this.htmlBuilder.submit('header', 'header', 'Confirm')
    return [htmlString, element];
  }

  buildHeader(element) {
    var htmlString = this.htmlBuilder.buildH1(element);
    return htmlString;
  }
}

export default Builder;
