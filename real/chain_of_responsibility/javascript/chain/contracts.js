import Handler from './handler.js';

export default class Contracts extends Handler {
  constructor(chain=undefined, debug=undefined, geth=undefined){
    super(chain, debug, geth);
  }

  readBlock (block, output) {
    self = this;
    // this.log('transactions: ' + block.transactions.length);
    if (block.transactions.length > 0) {
      block.transactions.forEach(function(transaction) {
        // if (transaction.hash === "0x0814b6e41978349aef5ac6b6a30e1d9738d228c009fbe8cda88e004cb7057332"){
          // console.log('tx:',transaction);
          // console.log('getCode:', self.geth.eth.getCode("0x8138b6f87ae3d81616e241c1c0667b2c5d045b9a"));
          // console.log('to:', transaction.to);
          // null transaction.to indicates contract creation
          if (transaction.to === null){
            // console.log('contract creation tx:',transaction);
            transaction.to = 'contract creation';
            output.addContract(transaction.hash, transaction.from, transaction.to, transaction.value);
          } else {
            // console.log('getCode:', self.geth.eth.getCode(transaction.to));
            if (self.geth.eth.getCode(transaction.to) !== '0x'){
              output.addContract(transaction.hash, transaction.from, transaction.to, transaction.value);
            }
          }
        // }
      });
    }
    output.updateUi('contracts');
    if (this.successor !== undefined) {
      console.log('Passing block to successor from Contracts handler');
      this.successor.readBlock(block, output);
    } else {
      console.log("Finished handling block, no successor to try.");
    }

  }
}
