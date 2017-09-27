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
    htmlString += "\t<button id=\"" + id + "Button\" + name=\"" + name + "\">" + value + "</button>";
    htmlString += "</div";
    return htmlString;
  }

  inputRow(id=null, name=null, type='text', value=null, klass=null){
    if (id !== null && name === null) name = id;
    var htmlString = "<div class=\"form-group\">\n";
    htmlString += "\t" + this.label('name', name) + "\n";
    htmlString += "\t" + this.input(id, name, type, value, klass) + "\n";
    htmlString += "</div>";
    htmlString += "\t" + this.submit(id, name, 'Confirm');
    return htmlString;
  }
}

export default HtmlBuilder;
