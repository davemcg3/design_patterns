"use strict";

import Handler from './chain/handler.js';
import Transactions from './chain/transactions.js';
import Contracts from './chain/contracts.js';

(function main() {

var Web3 = require('web3');
// var Web3 = require('node_modules/web3/src/index.js');
var web3;

if (typeof(web3) !== typeof(undefined)) {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:30303")); // https://github.com/ethereum/go-ethereum/issues/2982#issuecomment-245296183
}

// console.log('eth: ', web3.eth);
// var coinbase = web3.eth.coinbase;
// console.log('coinbase:',coinbase);
//
// // var balance = web3.eth.getBalance(coinbase);
// var balance = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether");
// console.log('balance: ' + balance);
//
// var hashrate = web3.eth.hashrate;
// console.log('hash rate: ' + hashrate);

var latestBlock = web3.eth.getBlock('latest', true); //latest // 2678233 2681641
console.log(latestBlock);

var chainHandler = new Handler([new Transactions(undefined, undefined, web3), new Contracts(undefined, undefined, web3)], 1, web3);
// console.log(chainHandler);

var thisBlock = function(){};
thisBlock.updateUi = function (property){
  // console.log(property);
  // console.log(document.getElementById(property));
  switch(property){
    case "transactions":
      document.getElementById('transactionsCount').innerHTML = ' (' + thisBlock.transactions.length + ')';
      var columns = ['hash', 'from', 'to', 'amount', 'type'];
      var table = document.getElementById('transactions');
      thisBlock.transactions.forEach(function(transaction){
        var tr = document.createElement('tr');
        columns.forEach(function(col){
          var td = document.createElement('td');
          if (col === 'amount'){
            td.innerHTML = web3.fromWei(transaction[col], 'ether');
          } else {
            td.innerHTML = transaction[col];
          }
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
      break;
    case "contracts":
    document.getElementById('contractsCount').innerHTML = ' (' + thisBlock.contracts.length + ')';
      var table = document.getElementById('contracts');
      // thisBlock.contracts.forEach(function(contract){
      //   console.log('Contract:', contract);
      // });
      var columns = ['hash', 'from', 'to', 'amount'];
      var table = document.getElementById('contracts');
      thisBlock.contracts.forEach(function(transaction){
        var tr = document.createElement('tr');
        columns.forEach(function(col){
          var td = document.createElement('td');
          if (col === 'amount'){
            td.innerHTML = web3.fromWei(transaction[col], 'ether');
          } else {
            td.innerHTML = transaction[col];
          }
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
      break;
    default:
      document.getElementById(property).innerHTML = this[property];
  }
}
thisBlock.setProperty = function (property, value){
  this[property] = value;
  this.updateUi(property);
}
thisBlock.addTransaction = function (hash, from, to, amount, type){
  var row = { hash: hash, from: from, to: to, amount: amount, type: type };
  if (this.transactions === undefined) {
    this.transactions = [row];
  } else {
    this.transactions.push(row);
  }
}
thisBlock.addContract = function (hash, from, to, amount){
  var row = { hash: hash, from: from, to: to, amount: amount };
  if (this.contracts === undefined) {
    this.contracts = [row];
  } else {
    this.contracts.push(row);
  }
}

chainHandler.readBlock (latestBlock, thisBlock);
console.log(thisBlock);

})();
