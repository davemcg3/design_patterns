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
    if (json.header) {
      this.engine.outputHeader(json.header);
    }
    this.engine.outputContentRow();
    if (json.nav) {
      this.engine.outputNav(json.nav, 3);
    }
    if (json.pages) {
      this.engine.outputContent(json.pages, 9, page);
    }
    if (json.sidebar) {
      this.engine.outputSidebar(json.sidebar);
    }
    if (json.footer) {
      this.engine.outputFooter(json.footer);
    }
  }
}
export default LayoutBuilder;
