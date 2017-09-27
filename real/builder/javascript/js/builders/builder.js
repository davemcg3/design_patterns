import HtmlBuilder from '/js/builders/htmlBuilder.js';

class Builder {
  constructor(){
    this.htmlBuilder = new HtmlBuilder();
  }

  getSite(){
    //id=null, name=null, type='text', value=null, class=null
    return [this.htmlBuilder.inputRow('site'), 'site'];
  }
}

export default Builder;
