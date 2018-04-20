import Command from "../prototypes/command";
import Board from "../prototypes/board";
import Column from "../prototypes/column";
import Card from "../prototypes/card";

export default class TaskParser {

  constructor(sendToDispatch, queryLibrarian){
    this.sendToDispatch = sendToDispatch;
    this.queryLibrarian = queryLibrarian;
  }

  // processNode(node) {
  // }

  processTerminalNode(node) {
    // query the librarian to see if noun exists
    // if noun does not exist create it
    // return the reference to the noun
    return this.queryLibrarian(new Command('find_or_create', node.value));
  }

  processNonTerminal(node, interpreter) {
    let self = this;
    // Note: Subject and receiver are not necessarily tied to the correct objects. Parse the hierarchy!
    if (node.subject !== "") {
      var subject = interpreter.processNode(node.subject);
    }
    if (node.receiver !== "") {
      var receiver = interpreter.processNode(node.receiver);
    }
    console.log('subject: ', subject);
    console.log('receiver: ', receiver);
    // non-terminal nodes are verbs
    let nodeCount = 0;
    [subject, receiver].forEach(function(node){
      if (node !== undefined) nodeCount++;
    });
    // if we only have one noun process the verb for that noun
    if (nodeCount === 1) {
      [subject, receiver].forEach(function(leaf) {
        if (node !== undefined) {
          self.sendToDispatch(new Command('register', leaf));
        }
      });
    } else if (nodeCount === 2) {
      // if we have 2 nouns use the board->column->card hierarchy to determine which is the receiving object and then
      // process the verb for the subject object on the receiving object
      // there is a good pattern to do this cleanly but it's not coming to me at the moment, maybe one of the proxies?
      // for now just build out a big ol' pyramid of doom
      if (subject instanceof Board) {
        // in this case receiver should be a column
        if (receiver instanceof Column) {
          // do something good
        } else {
          console.log("we have a problem");
        }
      } else if (subject instanceof Column) {
        if (receiver instanceof Board) {
          console.log('we have something here');
          self.sendToDispatch(new Command('register', node));
        } else if (receiver instanceof Card) {
          console.log('put your game down, flip it, and reverse it');
        } else {
          console.log('we have a problem');
        }
      } else if (subject instanceof Card) {
        if (receiver instanceof Board) {
          console.log('that\'s not right.');
        } else if (receiver instanceof Column){
          console.log('flawless');
          self.sendToDispatch(new Command('register', node));
        } else if (receiver instanceof Card) {
          console.log('uh oh');
        }
      }
    }
  }
}