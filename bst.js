class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  #arrayToBST(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = start + Math.floor((end - start) / 2);
    const node = new Node(array[mid]);
    node.left = this.#arrayToBST(array, start, mid - 1);
    node.right = this.#arrayToBST(array, mid + 1, end);
    return node;
  }

  buildTree(array) {
    const sortedArray = array.toSorted((a, b) => a - b);
    let i = 0;
    let finalArray = [];
    while (i < sortedArray.length) {
      if (finalArray.findIndex((element) => element == sortedArray[i]) == -1) {
        finalArray.push(sortedArray[i]);
      }
      i++;
    }
    this.root = this.#arrayToBST(finalArray, 0, finalArray.length - 1);
  }

  #findLeaf(value, node) {
    if (value < node.value) {
      if (node.left != null) {
        return this.#findLeaf(value, node.left);
      } else {
        return node;
      }
    } else {
      if (node.right != null) {
        return this.#findLeaf(value, node.right);
      } else {
        return node;
      }
    }
  }

  insertValue(value) {
    if (this.root == null) {
      this.root = new Node(value);
    } else {
      let leaf = this.#findLeaf(value, this.root);
      if (value < leaf.value) {
        leaf.left = new Node(value);
      } else {
        leaf.right = new Node(value);
      }
    }
  }

  #findMin(node) {
    while (node.left != null) {
      node = node.left;
    }
    return node;
  }

  #deleteValueBST(node, value) {
    if (node == null) {
      return node;
    } else if (value < node.value) {
      node.left = this.#deleteValueBST(node.left, value);
    } else if (value > node.value) {
      node.right = this.#deleteValueBST(node.right, value);
    } else {
      //node has no children
      if (node.left == null && node.right == null) {
        return null;
      }

      //node has one child
      else if (node.left == null) {
        return node.right;
      } else if (node.right == null) {
        return node.left;
      }
      //node has 2 children
      else{
        let tempNode = this.#findMin(node.right)
        node.value = tempNode.value;
        node.right = this.#deleteValueBST(node.right, tempNode.value);
      }
    }
    return node;
  }

  deleteValue(value) {
    this.root = this.#deleteValueBST(this.root, value);
  }

  #findBST(node,value){
    if (value == node.value){
      return node;
    }else if (value < node.value){
      return this.#findBST(node.left,value)
    }else if (value > node.value){
      return this.#findBST(node.right,value)
    }
  }


  find(value){
    return this.#findBST(this.root,value)
  }

  levelOrder(callback){
    if (typeof(callback) != 'function'){
      throw new Error('callback is required')
    }
    let queue = [this.root];
    while(queue[0] != undefined && queue[0] != null){
      const currentNode = queue.shift();
      callback(currentNode)
      if (currentNode.left != null){
        queue.push(currentNode.left)
      }
      if (currentNode.right != null){
        queue.push(currentNode.right)
      }
    }
  }

  #preOrderBST(node,callback){
    if(node != null){
      callback(node)
      this.#preOrderBST(node.left,callback)
      this.#preOrderBST(node.right,callback)
    }
  }
  preOrder(callback){
    if (typeof(callback) != 'function'){
      throw new Error('callback is required')
    }
    this.#preOrderBST(this.root,callback)
  }

  #inOrderBST(node,callback){
    if(node != null){
      this.#inOrderBST(node.left,callback)
      callback(node)
      this.#inOrderBST(node.right,callback)
    }
  }
  inOrder(callback){
    if (typeof(callback) != 'function'){
      throw new Error('callback is required')
    }
    this.#inOrderBST(this.root,callback)
  }

  #postOrderBST(node,callback){
    if(node != null){
      this.#postOrderBST(node.left,callback)
      this.#postOrderBST(node.right,callback)
      callback(node)
    }
  }
  postOrder(callback){
    if (typeof(callback) != 'function'){
      throw new Error('callback is required')
    }
    this.#postOrderBST(this.root,callback)
  }

  #heightBST(node){
    if(node == null){ return -1}
    let leftHeight = this.#heightBST(node.left)
    let rightHeight = this.#heightBST(node.right)
    if (leftHeight > rightHeight){
      return (leftHeight +1)
    }else{
      return (rightHeight +1)
    }
  }

  height(node){
   return this.#heightBST(node)

  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};



bst = new Tree();
// bst.insertValue(2)
// bst.insertValue(1)
// bst.insertValue(4)
// bst.insertValue(3)
bst.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bst.root);
// bst.levelOrder((node)=>{
//   console.log(node)
// })
// bst.inOrder((node)=>{console.log(node)})
console.log(bst.height(bst.find(8)))
// bst.deleteValue(8);
// prettyPrint(bst.root);
// console.log()
