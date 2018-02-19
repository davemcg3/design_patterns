import Handler from './handler.js';

export default class Transactions extends Handler {
  constructor(chain=undefined, debug=undefined, geth=undefined){
    super(chain, debug, geth);
  }

  readBlock (block, output) {
    self = this;
    this.log('transactions: ' + block.transactions.length);
    if (block.transactions.length > 0) {
      block.transactions.forEach(function(transaction) {
        var type = 'transfer';
        var to = transaction.to
        if (transaction.to === null || self.geth.eth.getCode(transaction.to) !== '0x'){
          type = 'contract';
          if (transaction.to === null) to = 'contract creation';
        }
        output.addTransaction(transaction.hash, transaction.from, to, transaction.value, type);
      });
    }
    output.updateUi('transactions');
    if (this.successor !== undefined) {
      console.log('Passing block to successor from Transactions handler');
      this.successor.readBlock(block, output);
    } else {
      console.log("Finished handling block, no successor to try.");
    }

  }
}
