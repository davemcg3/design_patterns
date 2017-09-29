class HtmlBuilder {
  constructor() {

  }

  addAttribute(name, value){
    return " " + name + "=\"" + value + "\"";
  }

  input (id=null, name=null, type='text', value=null, klass=null){
    var htmlString = "<input";
    if (id !== null) htmlString += this.addAttribute('id', id);
    if (name !== null) htmlString += this.addAttribute('name', name);
    if (type !== null) htmlString += this.addAttribute('type', type);
    if (value !== null) htmlString += this.addAttribute('value', value);
    if (klass !== null) htmlString += this.addAttribute('class', klass);
    htmlString += ">";
    return htmlString;
  }

  label(name, value){
    return "<label for=\"" + name + "\">" + value + "</label>"
  }

  submit(id, name, value='Submit') {
    var htmlString = "<div class=\"form-group\">\n";
    htmlString += "\t<button id=\"" + id + "Button\" name=\"" + name + "Button\">" + value + "</button>";
    htmlString += "</div";
    return htmlString;
  }

  inputRow(id=null, name=null, type='text', value=null, klass=null){
    if (id !== null && name === null) name = id;
    var htmlString = "<div class=\"form-group\">\n";
    htmlString += "\t" + this.label('name', name) + "\n";
    htmlString += "\t" + this.input(id, name, type, value, klass) + "\n";
    htmlString += "</div>";
    return htmlString;
  }

  buildAnchor(link, text, anchorClass=null) {
    var htmlString = "<a href=\"" + link + "\"";
    if (anchorClass !== null) {
      htmlString += " class=\"" + anchorClass + "\"";
    }
    htmlString += ">" + text + "</a>";
    return htmlString;
  }

  buildUl(elements) {
    var htmlString = "<ul>\n";
    elements.forEach(function(element) {
      htmlString += "\t<li>" + element + "</li>\n";
    });
    htmlString += "</ul>\n";
    return htmlString;
  }

  buildH1(element) {
    return "<h1>" + element + "</h1>";
  }

  buildSmall(element) {
    return "<small>" + element + "</small>";
  }
}

export default HtmlBuilder;
