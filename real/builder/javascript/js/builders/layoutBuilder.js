//import HtmlBuilder from '/js/builders/htmlBuilder.js';
import DefaultEngine from '/js/engines/default.js'

class LayoutBuilder {
  constructor(engine='default', site){
    this.site = site
    switch(engine){
      //case '<engine name>':
      //  break;
      default:
        this.engine = new DefaultEngine(this.site);
    }
  }

  output(json, page, options){
    this.engine.outputHeader(json.header);
    this.engine.outputContentRow();
    this.engine.outputNav(json.nav, 3);
    this.engine.outputContent(json.pages, 9, page);
    this.engine.outputSidebar(json.sidebar);
    this.engine.outputFooter(json.footer);
  }
}
export default LayoutBuilder;
