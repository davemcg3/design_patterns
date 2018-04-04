export default class TreeNode {
  constructor(value, subject="", receiver=""){
    this.value = value;
    this.subject = subject;
    this.receiver = receiver;
  }

  toString(count=1){
      count++;
    return this.value.toString() + "\t=>" + this.subject.toString(count) + "\n" + Array(count+1).join("\t") + "=>" + this.receiver.toString(count);
  }
}