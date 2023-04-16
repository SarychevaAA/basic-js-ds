const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    if (this.treeRoot === null){
      this.treeRoot = new Node(data);
      return true;
    }
    else{
      let currentNode = this.treeRoot;
      while (data < currentNode.data || data > currentNode.data){
        if (data < currentNode.data && currentNode.left){
          currentNode = currentNode.left;
        }
        else if (data < currentNode.data){
          currentNode.left = new Node(data);
          return true;
        }
        else if (data > currentNode.data && currentNode.right){
          currentNode = currentNode.right;
        }
        else{
          currentNode.right = new Node(data);
          return true;
        }
      }
      return false;
    }
  }

  has(data, currentNode = this.treeRoot) {
    if (currentNode === null) return false;
    if (currentNode.data === data) return true;
    else if (data < currentNode.data){
      return this.has(data, currentNode.left);
    }
    else{
      return this.has(data, currentNode.right);
    }
  }

  find(data) {
    if (!this.has(data)){
      return null;
    }
    let currentNode = this.treeRoot;
    while ((currentNode.left || currentNode.right) && currentNode.data !== data){
      currentNode = (data < currentNode.data) ? currentNode.left : currentNode.right
    }
    return currentNode;
  }

  remove(data, currentNode=this.root()) {
    if (currentNode === null){
      return null;
    }
    if (data < currentNode.data) currentNode.left=this.remove(data, currentNode.left);
    else if (data > currentNode.data) currentNode.right=this.remove(data, currentNode.right);
    else{
      if (!currentNode.right){
        currentNode = currentNode.left;
      }
      else if (!currentNode.left){
        currentNode = currentNode.right;
      }
      else{
        currentNode.data = this.min(currentNode.right);
        currentNode.right = this.remove(currentNode.data, currentNode.right);
      }
    }
    return currentNode;
  }

  min(currentNode = this.treeRoot) {
    while (currentNode.left){
      currentNode = currentNode.left
    }
    return currentNode.data
  }

  max(currentNode = this.treeRoot) {
    while (currentNode.right){
      currentNode = currentNode.right
    }
    return currentNode.data
  }
}

module.exports = {
  BinarySearchTree
};