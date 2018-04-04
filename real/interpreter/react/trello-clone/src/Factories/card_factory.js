import Card from "../prototypes/card";

export default class CardFactory {
  generate(title) {
    return new Card(title);
  }
}