export default class Token {
  constructor(noun, data){
    this.noun = noun;
    this.data = data;
  }

  toString(){
    return this.noun + ": " + this.data;
  }
}

