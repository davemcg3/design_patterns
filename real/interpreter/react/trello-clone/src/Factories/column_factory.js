import Column from "../prototypes/column";

export default class ColumnFactory {
  generate(title) {
    return new Column(title);
  }
}