import SinglyLinkedList from '../链表/SinglyLinkedList.js'
/**
 push(element)：添加一个（或几个）新元素到栈顶
 pop()：移除栈顶的元素，同时返回被移除的元素
 peek()：返回栈顶的元素，不对栈做任何修改
 isEmpty()：如果栈里没有任何元素就返回true，否则返回false
 clear()：移除栈里的所有元素
 size()：返回栈里的元素个数

 A,B,C,D 进栈
 先进后出   D C B A
 */
export default class Stack {
  constructor(){
    this.linkedList = new SinglyLinkedList()
  }

  push (value) {
    this.linkedList.prepend(value)
    return this
  }

  pop () {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead : null
  }

  peek () {
    if (this.isEmpty()) {
      return null
    }
    return this.linkedList.head
  }

  isEmpty () {
    return !this.linkedList.head
  }

  size () {
    return this.linkedList.size()
  }

  clear () {
    this.linkedList = null
  }

  toArray () {
    return this.linkedList.toArray()
  }
}