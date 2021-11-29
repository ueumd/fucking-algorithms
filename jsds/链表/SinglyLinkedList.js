/**
 append(element)：向链表尾部添加新项
 insert(position, element)：向链表的特定位置插入一个新的项
 removeAt(position)：从链表的特定位置移除一项
 remove(element)：从链表中移除一项
 indexOf(element)：返回元素在链表中的索引。如果链表中没有该元素则返回-1
 isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0，返回false
 size()：返回链表包含的元素个数，与数组的length属性类似
 getHead()：返回链表的第一个元素
 toString()：由于链表使用了Node类，就需要重写继承自JavaScript对象默认的toString()方法，让其只输出元素的值
 print()：打印链表的所有元素
 */


class Node {
  constructor(element = null, next = null) {
    this.element = element
    this.next = next
  }
}

export default class SinglyList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  /**
   * 插入元素
   * @param element
   */
  append(element) {
    let newNode = new Node(element)
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      // let curNode = this.head
      // while (curNode.next) {
      //   curNode = curNode.next
      // }
      //
      // // 找到最后一个节点
      // curNode.next = newNode

      this.tail.next = newNode
      this.tail = newNode
    }

    this.length++
  }

  /**
   * 尾插法
   * @param value
   * @returns {SinglyList}
   */
  prepend(value) {
    // Make new node to be a head.
    const newNode = new Node(value, this.head)
    this.head = newNode

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode
    }
    this.length++
    return this
  }

  /**
   * 向单向链表中插入某个元素
   * @param  {Number} position 插入的位置
   * @param  {Any} element     插入的元素
   * @return {Boolean}        成功返回true，失败返回false
   */
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false
    }

    let newNode = new Node(element)
    let curNode = this.head
    let index = 0
    let preNode = null

    if (position === 0) {
      newNode.next = curNode
      this.head = newNode
    } else {
      // 排除不需要插入的节点
      while (index++ < position) {
        preNode = curNode      // 保存上一节点
        curNode = curNode.next // 保存当前节点
      }

      // 找到节点
      newNode.next = curNode
      preNode.next = newNode
    }

    this.length++
    return true
  }


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
    return curNode.data
  }

  /**
   * 移除给定的元素
   * @param  {Any} element    要移除的元素
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

  getHead() {
    if (!this.isEmpty()) {
      return this.head
    }
  }

  toString() {
    let curNode = this.head
    let str = ''
    while (curNode) {
      str += ' ' + curNode.data
      curNode = curNode.next
    }

    // 删除前面第一个空格slice(1)
    return str.slice(1)
  }

  /**
   * 单向连表
   * 已知一个单链表的头结点，找到该链表中，倒数第 K 个结点。
   * @param k
   * @returns {*}
   */
  //
  theKthNode(k) {
    if (k < 0) {
      return null;
    }

    let fast = this.head
    let slow = this.head
    let i = k;

    // fast 指针，先走 K 步
    for (; i > 0 && fast != null; i--) {
      fast = fast.next
    }

    if (i > 0) {
      // 链表长度，小于 K
      return null;
    }
    // fast、slow 同步走
    while (fast != null){
      slow = slow.next
      fast = fast.next
    }
    return slow
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
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
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

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.head.element.key === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (currentNode.next.element.key  === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail.element.key === value) {
      this.tail = currentNode;
    }

    this.length --
    return deletedNode;
  }

}
