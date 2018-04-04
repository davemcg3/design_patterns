import React, { Component } from 'react';
import TreeNode from "../prototypes/tree_node";
import Token from "../prototypes/token";

class Tokenizer extends Component {
  constructor(props) {
    super(props);
    this.tokenize = this.tokenize.bind(this);

    // initialize algorithm
    // for now we're not using the rpn algorithm, just the syntax tree, but this is built in for future expansion to accept a passed-in algorithm
    this.algorithm = this.props.algorithm || 'ast';
  }

  tokenize(command){
    switch(this.algorithm){
      case 'rpn':
        return this.buildRPN(command.attributes);
      case 'ast':
        return this.buildAbstractSyntaxTree(command.attributes);
      default:
        console.log('Tokenization algorithm not properly initialized');
        return;
    }
  }

  buildAbstractSyntaxTree(command){
    // TODO: Abstract tokenization

    // TODO: Abstract these out to the calling function
    var pattern = /".+"|\w+/g;
    var tokens = command.match(pattern);
    console.log(command);
    console.log(tokens);

    // TODO: Abstract these out too
    var outputStack = [];
    var operationStack = [];
    var nouns = ["board", "column", "card"];
    var verbs = ["add", "remove", "move", "update"]
    var prepositions = ["to"];
    for(var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      console.log('starting loop on ' + token);

      if (nouns.indexOf(token) > -1) {
        //lookahead
        console.log('in nouns, lookahead: ' + tokens[i + 1]);
        // nouns always take a string argument for a title
        outputStack.push(new TreeNode(new Token(token, tokens[++i])));
      } else if (prepositions.indexOf(token) > -1) {
        console.log('in prepositions');
        // TODO: figure out how to use the context to infer the correct type of element and create it as a receiving
        // element for the command (i.e. if we have a card we know the receiving elements is a column so it should be
        // optional in the grammar
        // for now drop the preposition and grab the next 2 tokens which should define a noun
        outputStack.push(new TreeNode(new Token(tokens[++i], tokens[++i])));
      } else if (verbs.indexOf(token) > -1){
        console.log('in verbs');
        operationStack.push(token);
      }
    }

    for(var i = 0; i < operationStack.length; i++) {
      var right = outputStack.pop();
      var left = outputStack.pop();
      outputStack.push(new TreeNode(operationStack.pop(), left, right));
    }

    console.log(outputStack);
    return outputStack[0];
  }

  buildRPN(command){
    // https://medium.freecodecamp.org/how-to-build-a-math-expression-tokenizer-using-javascript-3638d4e5fbe9
    var pattern = /".+"|\w+/g;
    var tokens = command.match(pattern);
    console.log(command);
    console.log(tokens);

    // build RPN
    var outputQueue = [];
    var operationStack = [];
    var nouns = ["board", "column", "card"];
    var verbs = ["add", "remove", "move", "update"]
    var prepositions = ["to"];
    for(var i = 0; i < tokens.length; i++){
      var token = tokens[i];
      console.log('starting loop on ' + token);
      // if (++loopCount == 1) {
      //   command = token;
      // } else {
        console.log('nouns.indexOf ' + token + ': ' + nouns.indexOf(token));
        console.log('verbs.indexOf ' + token + ': ' + verbs.indexOf(token));
        console.log('prepositions.indexOf ' + token + ': ' + prepositions.indexOf(token));
        if (nouns.indexOf(token) > -1) {
          //lookahead
          console.log('in nouns, lookahead: ' + tokens[i + 1]);
          // nouns always take a string argument for a title
          outputQueue.push(new Token(token, tokens[++i]));
        } else if (prepositions.indexOf(token) > -1) {
          console.log('in prepositions');
          outputQueue.push(new Token(token, tokens[++i]));
        } else if (verbs.indexOf(token) > -1){
          console.log('in verbs');
          operationStack.push(token);
        }
      // }

    };
    while (operationStack.length > 0){
      outputQueue.push(operationStack.pop());
    }

    console.log(outputQueue);
    return outputQueue;
  }

  render () {
    return (
      <div>
      </div>
    );
  }
}

export default Tokenizer;