/**
双向链表提供了两种迭代列表的方法：
 从头到尾
 从尾到头。
 我们可以访问一个特定节点的下一个或前一个元素。
 在单向链表中，如果迭代链表时错过了要找的元素，就需要回到链表起点，重新开始迭代。
 在双向链表中，可以从任一节点，向前或向后迭代，这是双向链表的一个优点。

 */

class Node {
  constructor(data = null, next = null, prev = null) {
    this.element = data
    this.next = next
    this.prev = prev
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(element) {
    let newNode = new Node(element)
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode  // 将队尾元素next指向插入的元素
      newNode.prev = this.tail  // 插入的新元素上一级指向原来的队尾元素素
      this.tail = newNode       // 新元素成为队尾
    }
    this.length++
    return this
  }

  // 正向遍历的方法
  forwardString() {
    let curNode = this.head
    let str = ''
    while (curNode) {
      str += ' ' + curNode.element
      curNode = curNode.next
    }
    return str.slice(1)
  }

  // 反向遍历的方法
  reverseString() {
    let curNode = this.tail
    let str = ''
    while (curNode) {
      str += ' ' + curNode.element
      curNode = curNode.prev
    }

    return str.slice(1)
  }

  toString() {
    return this.forwardString()
  }

  getHead() {
    return this.head.element
  }

  getTail() {
    return this.tail.element
  }
  /**
   * 向单向链表中插入某个元素
   * @param  {Number} position 要插入的位置
   * @param  {Any} element  要插入的元素
   * @return {Boolean}          插入成功返回true，失败返回false
   */
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false
    }

    let newNode = new LinkedListNode(element)
    let curNode = this.head
    let index = 0
    let preNode = null

    if (position === 0) {
      if (this.head === null) {
        this.head = newNode
        this.tail = newNode
      } else {
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
      }

    } else if (position === this.length) {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    } else {

      // 不需要插入的节点
      while (index++ < position) {
        preNode = curNode       // 保存上一节点
        curNode = curNode.next  // 保存当前节点
      }

      // 找到节点
      newNode.next = curNode
      newNode.prev = preNode

      curNode.prev = newNode
      preNode.next = newNode

    }

    this.length++
    return true
  }


  /**
   * 寻找某个元素在单向链表中的位置
   * @param  {Any} element 要寻找的元素
   * @return {Number}      返回值>=0则代表找到相应位置
   */
  indexOf(elemnt) {
    let curNode = this.head
    let index = 0

    while (curNode) {

      // 找到
      if (curNode.element === elemnt) {
        return index
      }

      //继续找
      index++
      curNode = curNode.next
    }

    // 没有找到
    return -1
  }

  find({value = undefined, callback = undefined}) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // callback返回值为 false 就一直查找
      if (callback && callback(currentNode.element)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && currentNode.element === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * 移除指定位置的元素
   * @param postion
   * @returns {*}
   */
  removeAt(postion) {
    if (postion <= -1 || postion > this.length) return null

    let curNode = this.head
    let prvNode
    let index = 0
    if (postion === 0) {
      // 因为之前head指向第一个元素，现在把head修改为指向第二个元素。
      // 核心概念在于链表前后全靠指针链接，而非数组一般。
      // 所以只需要改变head的元素。

      this.head = curNode.next
    } else {
      // 跟插入操作类似处理
      while (index++ < postion) {
        prvNode = curNode
        curNode = curNode.next
      }

      prvNode.next = curNode.next
    }

    this.length--
    return curNode.element
  }

  /**
   * 移除给定的元素
   * @param  {Any} element     要移除的元素
   * @return {Number}         返回值>=0表示移除成功
   */
  remove(element) {
    let index = this.indexOf(element)
    if (index > -1) {
      return this.removeAt(index)
    } else {
      return null
    }
  }

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  clear () {
    this.head = null
    this.tail = null
    this.length = 0
  }


  toArray() {
    let list = []
    let current = this.head
    while (current) {
      list.push(current.element)
      current = current.next
    }
    return list
  }

  /**
   * 反转链表
   * @returns {LinkedList}
   */
  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Store next node.
      nextNode = currNode.next

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    // 返回当前实例对象
    return this
  }

  fromArray (values) {
    if (!Array.isArray(values)) return false
    values.forEach(value => this.append(value))
    return this
  }

}