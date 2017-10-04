import Storage from '/js/storage.js';
import LayoutBuilder from '/js/builders/layoutBuilder.js'
import alphaBuilder from '/alphaBuilder.js'

class Viewer {
  constructor(site=null, page=null, options=null){
    this.storage = new Storage();

    if (site === null) {
      //set a default
      site = 'alphaBuilder';
      this.site = site;
      this.siteJson = alphaBuilder;
      this.storage.storeItem(this.site, JSON.stringify(this.siteJson));
    }

    this.site = site;
    this.page = page;
    this.options = this.options;

    // load site configuration
    if (this.site !== null) {
      //grab the site structure from storage medium
      if (this.siteJson === undefined) {
        if (this.siteJson = JSON.parse(this.storage.getItem(this.site))) {
          //noop
        }
      }
    }

    // load layout builder, passing in the desired engine. Different engines can produce different layouts.
    var layoutBuilder = new LayoutBuilder('default', this.site);

    // feed site configuration into layout engine and output site
    layoutBuilder.output(this.siteJson, this.page, this.options);
  }
}
export default Viewer;
