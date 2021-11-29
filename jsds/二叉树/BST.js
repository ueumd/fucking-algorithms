/**
 * 二叉搜索树
 * 特点:
 （1）若左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 （2）若右子树不空，则右子树上所有结点的值均大于它的根结点的值；
 （3）左、右子树也分别为二叉排序树；
 （4）没有键值相等的节点。
 */
class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

export default class BinarySearchTree {
  constructor() {
    // 根节点
    this.root = null
  }

  /**
   * 插入数据
   * @param data
   */
  insert(data) {
    let newNode = new Node(data)
    if (this.root === null) {
      this.root = newNode
    } else {
      this._insertNode(this.root, newNode)
    }
    return this
  }

  /**
   * 左边子树小于右边子树的值
   * @param node
   * @param newNode
   */
  _insertNode (node, newNode) {
    // 准备向左子树插入数据
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        // 子树上有内容递归
        this._insertNode(node.left, newNode)
      }
    } else {
      // 准备向右子树插入数据
      if (node.right === null) {
        node.right = newNode
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }

  /**
   * 查找
   * @param data
   * @returns {boolean}
   */
  serach(data) {
    let curNode = this.root
    while (curNode !== null) {
      if (curNode.data > data) {          // 根节点大于key 左子树
        curNode = curNode.left
      } else if (curNode.key < data) {   // 根节点小于key 右子树
        curNode = curNode.right
      } else {
        // 找到（包含root）
        return true
      }
    }
    // 未找到
    return false
  }

  getRoot() {
    return this.root
  }

  /**
   * 最大的节点: 根节点  右子树上
   */
  getMaxNode() {
    let node = this.root
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node
    }
    return null
  }

  /**
   * 最小节点: 根节点  左子树上
   */
  getMinNode() {
    let node = this.root
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }

      return node
    }
    return null
  }


  /**
   * 先序遍历  根 左 右
   */
  preOrderTraversal(cb) {
    this.preOrderTraversalNode(this.root, cb)
  }

  preOrderTraversalNode(node, cb) {
    if (node !== null) {
      cb(node.key)
      // 递归算法
      this.preOrderTraversalNode(node.left, cb)
      this.preOrderTraversalNode(node.right, cb)
    }
  }

  /**
   * 中序遍历 左 根 右
   */
  inOrderTraversal(cb) {
    this.inOrderTraversalNode(this.root, cb)
  }

  inOrderTraversalNode(node, cb) {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, cb)
      cb(node.key)
      this.inOrderTraversalNode(node.right, cb)
    }
  }

  /**
   * 后序遍历 左 右 根
   */
  postOrderTraversal(cb) {
    this.postOrderTraversalNode(this.root, cb)
  }

  postOrderTraversalNode(node, cb) {
    if (node !== null) {
      this.postOrderTraversalNode(node.left, cb)
      this.postOrderTraversalNode(node.right, cb)
      cb(node.key)
    }
  }

  /**
   翻转二叉树
   4
   /   \
   2     7
   / \   / \
   1   3 6   9

   4
   /   \
   7     2
   / \   / \
   9  6 3   1
   */
  invertTree (node = this.root) {
    if (node === null) {
      return
    }
    this.invertTree(node.left)
    this.invertTree(node.right)
    this.exchange(node)
  }

  exchange (node) {
    let temp = node.left
    node.left = node.right
    node.right = temp
  }


  /**
   移除节点的实现情况比较复杂，它会有三种不同的情况：
   1. 待删除的节点是叶子节点（无左右子树）
   2. 待删除的节点只有左子树或只有右子树
   3. 待删除的节点既有左子树又有右子树
   和实现搜索指定节点一元，要移除某个节点，必须先找到它所在的位置，因此移除方法的实现中部分代码和上面相同：
   */
  remove(key) {
    this._removeNode(this.root, key)
  }

  _removeNode(node, key) {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = this._removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._removeNode(node.right, key)
      return node
    } else {
      //需要移除的节点是一个叶子节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      //需要移除的节点包含一个子节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      //需要移除的节点包含两个子节点
      let aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}