class HtmlBuilder {
  constructor() {

  }

  addAttribute(name, value){
    return " " + name + "=\"" + value + "\"";
  }

  input (id=null, name=null, type='text', value=null, klass=null){
    var htmlString = "<input";
    if (id !== null) htmlString += this.addAttribute('id', id.replace("#", ""));
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

  submit(id, name, value='Submit', klass=null) {
    var htmlString = "<div class=\"form-group\">\n";
    htmlString += "\t<button id=\"" + id + "Button\" name=\"" + name + "Button\" class=\"" + klass + "\">" + value + "</button>";
    htmlString += "</div>";
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

  buildAnchor(link, text, anchorClass=null, ariacontrols=null, role=null, datatoggle=null) {
    var htmlString = "<a href=\"" + link + "\"";
    if (anchorClass !== null) {
      htmlString += " class=\"" + anchorClass + "\"";
    }
    if (ariacontrols !== null) {
      htmlString += " aria-controls=\"" + ariacontrols + "\"";
    }
    if (role !== null) {
      htmlString += " role=\"" + role + "\"";
    }
    if (datatoggle !== null) {
      htmlString += " data-toggle=\"" + datatoggle + "\"";
    }
    htmlString += ">" + text + "</a>";
    return htmlString;
  }

  buildUl(elements, ulClass=null, ulRole=null, liClass=null, liRole=null) {
    var htmlString = "<ul";
    if (ulClass !== null) {
      htmlString += " class=\"" + ulClass + "\"";
    }
    if (ulRole !== null) {
      htmlString += " role=\"" + ulRole + "\"";
    }
    htmlString += ">\n";
    elements.forEach(function(element) {
      htmlString += "\t<li";
      if (liClass !== null) {
        htmlString += " class=\"" + liClass + "\"";
      }
      if (liRole !== null) {
        htmlString += " role=\"" + liRole + "\"";
      }
      htmlString += ">" + element + "</li>\n";
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

  buildFooter(element) {
    return "<footer>" + element + "</footer>"
  }

  buildWrapper(element, role=null, klass=null, id=null, data_recursion=null) {
    var htmlString = "<div";
    if (role !== null) htmlString += " role=\"" + role + "\"";
    if (klass !== null) htmlString += " class=\"" + klass + "\"";
    if (id !== null) htmlString += " id=\"" + id + "\"";
    if (data_recursion !== null) htmlString += " data-recursion=\"" + data_recursion + "\"";
    htmlString += ">" + element + "</div>";
    return htmlString;
  }
}

export default HtmlBuilder;
