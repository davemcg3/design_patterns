export default class TreeNode {
  constructor(value, leftChildNode="", rightChildNode=""){
    this.value = value;
    this.leftChildNode = leftChildNode;
    this.rightChildNode = rightChildNode;
  }

  toString(count=1){
      count++;
    return this.value.toString() + "\t=>" + this.leftChildNode.toString(count) + "\n" + Array(count+1).join("\t") + "=>" + this.rightChildNode.toString(count);
  }
}