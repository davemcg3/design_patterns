import Storage from '/js/storage.js';
import LayoutBuilder from '/js/builders/layoutBuilder.js'

class Viewer {
  constructor(site=null, page=null, options=null){
    this.site = site;
    this.page = page;
    this.options = this.options;

    // load site configuration
    this.storage = new Storage();
    if (this.site !== null) {
      //grab the site structure from storage medium
      if (this.siteJson === undefined) {
        if (this.siteJson = JSON.parse(this.storage.getItem(this.site))) {
          //noop
        } else {
          // do something sensible here, but what?
        }
      } else {
      }
    } else {
      //do something sensible here, but what? Probably the same thing we do if parsing the JSON fails. Maybe load a default site that's included?
    }

    // load layout builder, passing in the desired engine. Different engines can produce different layouts.
    var layoutBuilder = new LayoutBuilder('default', this.site);

    // feed site configuration into layout engine and output site
    layoutBuilder.output(this.siteJson, this.page, this.options);
  }
}
export default Viewer;
