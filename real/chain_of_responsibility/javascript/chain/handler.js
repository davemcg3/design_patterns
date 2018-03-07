export default class Handler {
  // var successor, base;

  constructor( chain=undefined, debug=undefined, geth=undefined) {
    this.set_debug (debug);
    this.self = this;
    this.geth = geth;

    // build chain, but only on the base class
    // this.log(chain);
    if (chain === undefined) {
      //this.buildChain ([Transactions]);
      this.log('Handler:12 chain undefined');
    } else {
      if (this instanceof(Handler)){
        this.buildChain (chain);
      }
    }
  }

  readBlock (block, output) {
    // console.log(output);
    output.setProperty('blocknumber', block.number);
    this.successor.readBlock(block, output);
  }

  // set instance variables
  set_successor (successor){
    this.successor = successor;
  }

  set_base (base){
    this.base = base;
  }

  set_debug (debug){
    this.debug = debug;
  }

  // utility function
  log (message){
    if (this.debug){
      console.log(message);
    }
  }

  // buildChain and addLink are used to build out the chain by passing in an array of classes
  buildChain (chain){ // chain is an array
    chain.forEach(link => this.addLink (link, this));
  }

  addLink (link, base){
    if (this.successor === undefined){
      this.set_successor (link);
      this.successor.set_base (base);
    } else {
      this.successor.addLink (link, base);
    }
  }
}
